from .ocr_service import OCRService

from .document_service import DocumentService

# This makes importing cleaner in main.py
__all__ = ["OCRService", "LegalService","DocumentService"]