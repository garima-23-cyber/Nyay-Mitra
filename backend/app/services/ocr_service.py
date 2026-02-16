import io
import os
import asyncio
from google import genai
from google.genai import types
from pypdf import PdfReader
from docx import Document

class OCRService:
    def __init__(self):
        # 1. Force API version 'v1' for better stability with OCR
        self.client = genai.Client(
            api_key=os.getenv("GEMINI_API_KEY"),
            http_options=types.HttpOptions(api_version='v1')
        )
        # Using the standard flash model is safer for consistent OCR results
        self.model_id = "gemini-1.5-flash"

    async def extract_text(self, content: bytes, filename: str) -> str:
        ext = filename.split('.')[-1].lower()
        
        # 1. Image OCR (PNG, JPG, JPEG)
        if ext in ['png', 'jpg', 'jpeg']:
            try:
                prompt = (
                    "Extract all text from this document. Maintain structure. "
                    "Return ONLY the plain text."
                )
                
                # Use .aio for async calls and await the result
                response = await self.client.aio.models.generate_content(
                    model=self.model_id,
                    contents=[
                        prompt,
                        types.Part.from_bytes(data=content, mime_type=f"image/{ext}")
                    ]
                )
                return response.text if response.text else ""
            except Exception as e:
                print(f"Image OCR Error: {e}")
                return ""
            
        # 2. PDF Extraction
        elif ext == 'pdf':
            try:
                pdf_stream = io.BytesIO(content)
                reader = PdfReader(pdf_stream)
                text = "\n".join([page.extract_text() for page in reader.pages if page.extract_text()])
                
                # Fallback to AI Vision if the PDF is scanned (empty text)
                if len(text.strip()) < 50:
                    response = await self.client.aio.models.generate_content(
                        model=self.model_id,
                        contents=[
                            "OCR this scanned PDF and extract all text.",
                            types.Part.from_bytes(data=content, mime_type="application/pdf")
                        ]
                    )
                    return response.text if response.text else ""
                return text
            except Exception as e:
                print(f"PDF Extraction Error: {e}")
                return ""
            
        # 3. DOCX Extraction
        elif ext == 'docx':
            try:
                doc_stream = io.BytesIO(content)
                doc = Document(doc_stream)
                return "\n".join([para.text for para in doc.paragraphs])
            except Exception as e:
                print(f"DOCX Extraction Error: {e}")
                return ""
            
        return ""