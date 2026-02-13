# ⚖️ NyayMitra: AI-Powered Legal Document Assistant

**NyayMitra** (Justice Friend) 🤝 is a full-stack legal-tech solution designed to bridge the gap between complex legal jargon and common citizens. It leverages **Gemini 2.0 Flash-Lite** to deliver instant, bilingual (English & Sahaj Hindi) legal insights with actionable roadmaps and audio summaries 🎧📄.

---

## 🚀 Live Demo
- 🌐 **Frontend:** [https://nyay-mitra-frontend.vercel.app/]
- ⚙️ **Backend API:** [https://nyay-mitra-backend.onrender.com]

---

## ✨ Features

- 📑 **Multimodal Legal Analysis**  
  Processes PDFs and images of legal documents using Gemini 2.0’s native multimodal capabilities.

- 🌍 **Bilingual Output**  
  Provides summaries and procedural steps in both **English** and **Simplified Hindi (Sahaj Hindi)**.

- 🧭 **Interactive Legal Roadmap**  
  Generates a step-by-step strategic guide tailored to the uploaded document.

- 🔊 **Text-to-Speech (TTS)**  
  Includes bilingual audio summaries for enhanced accessibility.

- 🛠️ **Resilient Architecture**  
  Dual-model fallback system (**Flash 2.0 → Flash 1.5**) with smart rate-limiting handling.

---
## Contributors
- Garima
- Saumya Dwivedi


## 📸 Project Gallery

| 📤 Home Screen | 📄 Document Upload | 🧠 AI Analysis  | 🌐 Bilingual Summary & Roadmap |
| :---: | :---: | :---: | :---: |
| <img src="https://github.com/user-attachments/assets/b2962fa7-2d9b-42f8-8109-e3a398308041" width="250"/> | <img src="https://github.com/user-attachments/assets/11122a50-ba16-46b1-a0af-cdb322e8b941" width="250"/> | <img src="https://github.com/user-attachments/assets/0501c246-79ef-4f19-aed7-0a733f38f3d0" width="250"/> | <img src="https://github.com/user-attachments/assets/3e1c8ca7-4c15-40bc-9a54-a0304b95377c" width="250"/> |


---

## 🛠️ Tech Stack

### 🎨 Frontend
- ⚛️ React.js (Functional Components & Hooks)
- 🎨 Tailwind CSS (Legal-themed UI)
- 🧩 Lucide-React (Iconography)
- 🔗 Axios (API Communication)

### ⚙️ Backend
- ⚡ FastAPI (Python)
- 🤖 Google GenAI SDK (Native Gemini Integration)
- 🔄 AsyncIO (Non-blocking processing)
- 📋 Pydantic (Data validation)

---

## ⚙️ Installation & Setup

### ✅ Prerequisites
- 🐍 Python 3.10+
- 🟢 Node.js & npm
- 🔑 Gemini API Key (Google AI Studio)

---

### 🔧 Backend Setup
```bash
cd backend

GEMINI_API_KEY=your_key_here
pip install -r requirements.txt
uvicorn app.main:app --reload

cd frontend

REACT_APP_API_URL=http://localhost:8000
npm install
npm start






