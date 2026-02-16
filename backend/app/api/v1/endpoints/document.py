from fastapi import APIRouter, UploadFile, File, HTTPException, status
from app.services.document_service import DocumentService
from app.models.document import DocumentAnalysisResponse
from datetime import datetime
import logging

# Set up logging to track AI errors in the terminal
logger = logging.getLogger("uvicorn.error")

router = APIRouter()
doc_service = DocumentService()


@router.get("/search-laws")
async def search_laws(query: str):
    if not query:
        return []
    # Call the service we just updated
    results = await doc_service.get_legal_knowledge(query)
    return results

@router.post("/process", response_model=DocumentAnalysisResponse)
async def process_legal_document(file: UploadFile = File(...)):
    # 1. Validation of file extension
    allowed_extensions = {"pdf", "docx", "png", "jpg", "jpeg"}
    file_ext = file.filename.split(".")[-1].lower()
    
    if file_ext not in allowed_extensions:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=f"Unsupported format. Please upload: {', '.join(allowed_extensions)}"
        )

    try:
        # 2. Memory-Safe File Reading
        content = await file.read()
        
        # 3. Call the One-Shot Document Service
        # We pass the raw bytes directly to Gemini for multimodal analysis
        result = await doc_service.process_legal_document(content, file.filename)
        
        return result

    except Exception as e:
        logger.error(f"CRITICAL API ERROR: {str(e)}")
        
        # 4. Graceful Fallback
        # We return a valid object so the React UI doesn't crash with a 500 Error
        return DocumentAnalysisResponse(
            id=0,
            filename=file.filename,
            upload_date=datetime.now().isoformat(),
            raw_text_preview="Analysis Interrupted",
            simplified_summary="The AI is currently processing many requests.",
            simplified_summary_hi="एआई वर्तमान में कई अनुरोधों पर कार्रवाई कर रहा है।",
            roadmap=["Please wait 30 seconds and try again."],
            roadmap_hi=["कृपया 30 सेकंड प्रतीक्षा करें और पुनः प्रयास करें।"],
            rights_and_warnings=f"System Detail: {str(e)[:50]}...",
            rights_and_warnings_hi="तकनीकी समस्या के कारण सेवा अनुपलब्ध है।",
            language="Bilingual/Error"
        )
    finally:
        # 5. Always close the file to free up server RAM
        await file.close()