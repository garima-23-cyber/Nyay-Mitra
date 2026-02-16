import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from datetime import datetime

# 1. Load variables from .env as early as possible
load_dotenv()

app = FastAPI(
    title="NyayMitra API",
    description="Bilingual AI-powered legal document analysis (EN/HI).",
    version="1.0.0",
)

# 2. Enhanced CORS Configuration
# Tip: Adding "*" during debugging can help if Vercel origins change
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://nyay-mitra-frontend.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Import Routers AFTER app initialization to ensure env vars are ready
from app.api.v1.endpoints import document

# 4. Include Routers
app.include_router(
    document.router, 
    prefix="/api/v1/documents", 
    tags=["Legal Analysis"]
)

# 5. Root Health Check (Improved)
@app.get("/", tags=["Health"])
async def health_check():
    return {
        "status": "online", 
        "service": "NyayMitra Core API",
        "timestamp": datetime.now().isoformat(),
        "environment": os.getenv("NODE_ENV", "development") # Useful for debugging
    }

if __name__ == "__main__":
    import uvicorn
    # Use 8000 for local, but allow environment to override (useful for Render/Docker)
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)