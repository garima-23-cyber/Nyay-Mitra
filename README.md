# ⚖️ NyayMitra — AI-Powered Legal Intelligence System  
### *Justice, Simplified. Rights, Empowered.*

**NyayMitra (Justice Friend 🤝)** is a **production-grade legal-tech platform** built to bridge the gap between **complex legal jargon and everyday citizens**. It empowers users with **instant, bilingual legal intelligence**, structured judicial roadmaps, and accessibility-first safeguards tailored to the Indian legal ecosystem.

Powered by **:contentReference[oaicite:0]{index=0} 2.0 Flash**, NyayMitra transforms raw legal documents into **clear explanations, actionable next steps, and citizen-centric rights awareness**.

---

## 🚀 Live Links
- 🌐 **Web Interface:** https://nyay-mitra-frontend.vercel.app/  
- ⚙️ **API Engine:** https://nyay-mitra-backend.onrender.com/

---

## ✨ Core Features

### 📑 Multimodal Legal Document Extraction
Upload **high-resolution PDFs or images** of legal documents and instantly receive structured insights.  
✔ No manual OCR  
✔ Native vision understanding  
✔ Works with scanned & photographed documents  

---

### 🌍 Neural Bilingual Legal Engine
All outputs are generated in:
- 🇬🇧 **English**
- 🇮🇳 **Sahaj (Simple) Hindi**

Designed specifically for **Indian legal, cultural, and linguistic contexts**.

---

### 🧭 Judicial Roadmaps & Timelines
Transforms confusion into clarity by generating:
- Step-by-step procedural guidance  
- Case-specific timelines  
- Legal complexity analysis (**Low / Medium / High**)  

---

### 🔍 Rights Encyclopedia (NEW ⭐)
A dedicated **citizen-rights intelligence layer** covering:
- 🏛️ **Bharatiya Nyaya Sanhita (BNS)**
- 📜 **Indian Constitution**

Features:
- Real-time debounced search  
- Simplified explanations (no legal jargon)  
- Contextual warnings & safeguards  
- Citizen-first interpretation of rights and protections  

---

### 🔊 Accessibility-First Design
- 🔈 **Bilingual Text-to-Speech (TTS)**
- Enables users to *listen* to legal summaries and rights
- Designed for inclusivity across literacy levels  

---

## 📸 Project Gallery

**🏛️ Dashboard UI**  **📤 Smart Upload**  **🧠 AI Logic & Legal Roadmap**  **🧭Rigths**   **🧭Footer**

<p align="center">
  <img width="1900" height="827" alt="Screenshot 2026-02-17 131614" src="https://github.com/user-attachments/assets/1eea913c-d3c6-4eca-af21-8c8e0421b881" />
  <img width="1902" height="876" alt="Screenshot 2026-02-17 131704" src="https://github.com/user-attachments/assets/26a15ef3-fefa-4a8b-9bbd-e6e9f9e1f955" />
  <img width="1898" height="872" alt="Screenshot 2026-02-17 131811" src="https://github.com/user-attachments/assets/37617fef-5cbb-4e9f-9639-a9a0e8ecb416" />
  <img width="1900" height="863" alt="Screenshot 2026-02-17 131504" src="https://github.com/user-attachments/assets/603d3589-65a3-4d9f-94da-beaa7ca5223c" />
  <img width="1899" height="624" alt="Screenshot 2026-02-17 132027" src="https://github.com/user-attachments/assets/0252b4ef-e2ee-4a8a-9e1c-55decf6fcb2d" />
</p>

---

## 🛠️ Technical Uniqueness

### 🛡️ Resilient AI API Architecture
Optimized to handle **Gemini Free Tier (15 RPM)** limitations gracefully:

- **Global Async Locking**  
  Backend semaphore queues requests to prevent API crowding  

- **Exponential Backoff Strategy**  
  Automatically handles `429 Resource Exhausted` errors  

- **Frontend Debouncing**  
  Limits search triggers to **1 request per second**  

---

### 🎨 Premium Aesthetic UI
- Glassmorphism dark theme with gold accents ✨  
- Smooth micro-interactions using Framer Motion  
- Responsive, distraction-free navigation  
- Fully **BNS-compliant logic** reflecting latest Indian penal reforms  

---

## 💻 Tech Stack

### Frontend
- React.js  
- Tailwind CSS  
- Framer Motion  
- Lucide-React  

### Backend
- FastAPI (Python)  
- AsyncIO  
- Google GenAI SDK  

### DevOps
- GitHub Actions  
- Render (Backend)  
- Vercel (Frontend)  

---

## ⚙️ Setup & Installation

### 🔧 Backend
```bash
cd backend
pip install -r requirements.txt
# Create .env with GEMINI_API_KEY
uvicorn app.main:app --reload

cd frontend
npm install
# Create .env with REACT_APP_API_URL
npm start
---
🤝 Connect with the Developer
👩‍💻 Garima
