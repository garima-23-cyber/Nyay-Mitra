import os
import json
import asyncio
from datetime import datetime
from google import genai
from google.genai import types

class DocumentService:
    def __init__(self):
        self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        self.model_id = "gemini-2.0-flash"
        # 🚦 THE GATEKEEPER: This lock ensures only ONE request 
        # touches the Gemini API at any given microsecond.
        self.api_lock = asyncio.Lock()
        # 🕒 Mandatory gap between requests (60s / 15 requests = 4s)
        self.safe_delay = 5.5 

    def _get_mime_type(self, ext: str) -> str:
        mapping = {'pdf': 'application/pdf', 'png': 'image/png', 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg'}
        return mapping.get(ext, 'application/octet-stream')

    async def _call_gemini_with_retry(self, content, ext, max_retries=3):
        prompt = (
            "SYSTEM: You are NyayMitra, an expert legal intelligence system for Indian Law. "
            "TASK: OCR the document and return a detailed JSON analysis. "
        )

        # 🔒 Use the lock to prevent simultaneous calls
        async with self.api_lock:
            for attempt in range(max_retries):
                try:
                    # Force a "breathing period" before every call
                    await asyncio.sleep(self.safe_delay)
                    
                    return await self.client.aio.models.generate_content(
                        model=self.model_id,
                        contents=[
                            types.Part.from_bytes(data=content, mime_type=self._get_mime_type(ext)),
                            prompt
                        ],
                        config=types.GenerateContentConfig(temperature=0.1)
                    )
                except Exception as e:
                    if "429" in str(e) and attempt < max_retries - 1:
                        # If we still hit a limit, wait much longer (exponential)
                        backoff = (attempt + 1) * 10
                        print(f"Crowd detected. Backing off for {backoff}s...")
                        await asyncio.sleep(backoff)
                    else:
                        raise e

    async def get_legal_knowledge(self, query: str):
        """ 
        Unified Search also uses the lock so it doesn't 
        interrupt a document process. 
        """
        async with self.api_lock:
            prompt = (
                f"USER QUERY: {query}\n"
                "SYSTEM: Identify relevant Indian laws. Return JSON LIST."
            )
            try:
                await asyncio.sleep(self.safe_delay) # Respect the 15 RPM gap
                response = await self.client.aio.models.generate_content(
                    model=self.model_id,
                    contents=prompt,
                    config=types.GenerateContentConfig(temperature=0.2)
                )
                clean_text = response.text.replace("```json", "").replace("```", "").strip()
                return json.loads(clean_text)
            except Exception as e:
                print(f"Knowledge Lookup Error: {e}")
                return []

    async def process_legal_document(self, content: bytes, filename: str):
        ext = filename.split('.')[-1].lower()
        print(f"NyayMitra: Queuing {filename} for analysis...")

        try:
            # All locking and timing is handled inside the retry helper
            response = await self._call_gemini_with_retry(content, ext)
            clean_text = response.text.replace("```json", "").replace("```", "").strip()
            analysis_data = json.loads(clean_text)
            return self._format_response(filename, analysis_data)
        except Exception as e:
            print(f"Final NyayMitra Error: {e}")
            return self._get_fallback_response(filename, e)

    def _format_response(self, filename, data):
        return {
            "id": 1,
            "filename": filename,
            "upload_date": datetime.now().isoformat(),
            "raw_text_preview": "Analysis Complete",
            "language": "Bilingual (EN/HI)",
            "simplified_summary": data.get("simplified_summary", "N/A"),
            "simplified_summary_hi": data.get("simplified_summary_hi", "N/A"),
            "roadmap": data.get("roadmap", []),
            "roadmap_hi": data.get("roadmap_hi", []),
            "rights_and_warnings": data.get("rights_and_warnings", "N/A"),
            "rights_and_warnings_hi": data.get("rights_and_warnings_hi", "N/A"),
            "timeline": data.get("timeline", "2-4 Years"),
            "timeline_hi": data.get("timeline_hi", "2-4 साल"),
            "complexity": data.get("complexity", "Medium"),
            "case_category": data.get("case_category", "General Legal")
        }

    def _get_fallback_response(self, filename, error):
        return {
            "id": 0, "filename": filename, "upload_date": datetime.now().isoformat(),
            "raw_text_preview": "Queue Timeout", "language": "N/A",
            "simplified_summary": "The AI is processing other requests. Please wait 10 seconds.",
            "simplified_summary_hi": "एआई अन्य अनुरोधों पर काम कर रहा है। कृपया 10 सेकंड प्रतीक्षा करें।",
            "roadmap": ["Wait for queue"], "roadmap_hi": ["कतार की प्रतीक्षा करें"],
            "rights_and_warnings": str(error)[:100], "rights_and_warnings_hi": "सर्वर व्यस्त",
            "timeline": "", "timeline_hi": "", "complexity": "N/A", "case_category": "Legal"
        }