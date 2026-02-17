⚖️ NyayMitra — AI-Powered Legal Intelligence System

Justice, Simplified. Rights, Amplified.

NyayMitra (Justice Friend 🤝) is a production-grade legal-tech platform built to democratize access to justice in India. It translates dense legal language into clear, actionable, bilingual guidance using cutting-edge AI — empowering citizens to understand their rights without intimidation or intermediaries.

Powered by Google Gemini 2.0 Flash, NyayMitra delivers instant legal insights, structured judicial roadmaps, and accessibility-first experiences for real-world legal awareness.

🚀 Live Demo

🌐 Web App: https://nyay-mitra-frontend.vercel.app/

⚙️ API Engine: https://nyay-mitra-backend.onrender.com/

✨ Key Capabilities
📑 Multimodal Legal Document Intelligence

Upload PDFs or images of legal documents and receive structured insights instantly — no manual OCR, no preprocessing. Native vision understanding ensures accuracy even with scanned or photographed documents.

🌍 Neural Bilingual Legal Engine

All summaries, warnings, and next steps are generated in:

🇬🇧 English

🇮🇳 Sahaj (Simple) Hindi
Designed specifically for Indian legal and linguistic contexts.

🧭 Judicial Roadmaps & Timelines

Transforms legal confusion into clarity with:

Step-by-step procedural guidance

Case-specific timelines

Complexity classification (Low / Medium / High)

🔍 Rights Encyclopedia (BNS + Constitution)

A real-time, debounced legal search system covering:

Bharatiya Nyaya Sanhita (BNS)

Indian Constitutional Rights
Optimized for speed, accuracy, and citizen-centric explanations.

🔊 Accessibility-First Design

Integrated Bilingual Text-to-Speech (TTS) enables users to listen to their rights and legal summaries — ensuring inclusivity for all literacy levels.

📸 Project Gallery

🏛️ Dashboard UI  📤 Smart Upload  🧠 AI Logic  🧭 Legal Roadmap

<img src="https://github.com/user-attachments/assets/b2962fa7-2d9b-42f8-8109-e3a398308041" width="240"/> <img src="https://github.com/user-attachments/assets/11122a50-ba16-46b1-a0af-cdb322e8b941" width="240"/> <img src="https://github.com/user-attachments/assets/0501c246-79ef-4f19-aed7-0a733f38f3d0" width="240"/> <img src="https://github.com/user-attachments/assets/3e1c8ca7-4c15-40bc-9a54-a0304b95377c" width="240"/>
🛠️ Engineering Highlights (What Makes It Special)
🛡️ Resilient AI API Architecture

Built to operate smoothly under Gemini Free Tier (15 RPM) constraints:

Global Async Semaphore – Queues concurrent requests safely

Exponential Backoff Strategy – Auto-handles 429 Resource Exhausted errors

Frontend Debouncing – Prevents accidental API spamming (1 request/sec)

🎨 Premium UI / UX

Glassmorphism dark UI with gold accents ✨

Smooth micro-interactions via Framer Motion

Responsive, distraction-free navigation

Fully BNS-compliant logic reflecting current Indian penal reforms

💻 Tech Stack

Frontend

React.js

Tailwind CSS

Framer Motion

Lucide-React

Backend

FastAPI (Python)

AsyncIO

Google GenAI SDK

DevOps

GitHub Actions

Render (Backend)

Vercel (Frontend)

⚙️ Setup & Installation
🔧 Backend
cd backend
pip install -r requirements.txt
# Create .env with GEMINI_API_KEY
uvicorn app.main:app --reload

🎨 Frontend
cd frontend
npm install
# Create .env with REACT_APP_API_URL
npm start

🤝 Connect with the Developer

👩‍💻 Garima

LinkedIn

GitHub

Instagram
npm install
npm start



