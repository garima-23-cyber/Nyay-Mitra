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

    def _get_mime_type(self, ext: str) -> str:
        mapping = {'pdf': 'application/pdf', 'png': 'image/png', 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg'}
        return mapping.get(ext, 'application/octet-stream')

    async def _call_gemini_with_retry(self, content, ext, max_retries=3):
        """ Handles 429 RESOURCE_EXHAUSTED with manual exponential backoff """
        prompt = (
            "SYSTEM: You are NyayMitra, an expert legal intelligence system. "
            "TASK: OCR the document, provide a summary, roadmap, rights, timeline, and category. "
            "STRICT JSON SCHEMA: {"
            "'simplified_summary': '...', 'simplified_summary_hi': '...', "
            "'roadmap': [], 'roadmap_hi': [], "
            "'rights_and_warnings': '...', 'rights_and_warnings_hi': '...', "
            "'timeline': '...', 'timeline_hi': '...', "
            "'complexity': 'High/Medium/Low', 'case_category': '...'"
            "}"
        )

        for attempt in range(max_retries):
            try:
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
                    wait_time = (attempt + 1) * 5 
                    print(f"Quota hit. Retrying in {wait_time}s...")
                    await asyncio.sleep(wait_time)
                else:
                    raise e

    async def get_legal_knowledge(self, query: str):
        prompt = (
            f"USER QUERY: {query}\n"
            "SYSTEM: Identify relevant Indian laws. Return JSON LIST of objects with: "
            "'title', 'titleHi', 'detail', 'detailHi', 'type', 'timeline', 'timeline_hi'."
        )
        try:
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
        # Spreading requests to avoid immediate 429
        await asyncio.sleep(2) 

        try:
            response = await self._call_gemini_with_retry(content, ext)
            clean_text = response.text.replace("```json", "").replace("```", "").strip()
            analysis_data = json.loads(clean_text)
            return self._format_response(filename, analysis_data)
        except Exception as e:
            print(f"Final NyayMitra Error: {e}")
            return self._get_fallback_response(filename, e)

    def _format_response(self, filename, data):
        """ Standard successful response """
        return {
            "id": 1,
            "filename": filename,
            "upload_date": datetime.now().isoformat(),
            "raw_text_preview": "Analysis Complete", # Match Schema
            "language": "Bilingual (EN/HI)",         # Match Schema
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
        """ 
        CRITICAL: This must contain EVERY field found in _format_response 
        to avoid FastAPI ResponseValidationError.
        """
        return {
            "id": 0,
            "filename": filename,
            "upload_date": datetime.now().isoformat(),
            "raw_text_preview": "Service Busy",        # Added back
            "language": "Bilingual (EN/HI)",           # Added back
            "simplified_summary": "AI Limit Reached. Retrying shortly...",
            "simplified_summary_hi": "एआई सीमा पूरी हो गई। थोड़ी देर में पुनः प्रयास करें...",
            "roadmap": ["Wait for Quota Reset", "Retry Upload"], 
            "roadmap_hi": ["कोटा रीसेट का इंतज़ार करें", "पुनः प्रयास करें"],
            "rights_and_warnings": f"Error: {str(error)[:50]}",
            "rights_and_warnings_hi": "तकनीकी समस्या (कोटा सीमा)।",
            "timeline": "N/A", 
            "timeline_hi": "N/A",
            "complexity": "N/A", 
            "case_category": "Legal"
        }