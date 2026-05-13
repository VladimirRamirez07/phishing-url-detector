# 🛡️ Phishing URL Detector

🌐 **Live Demo:** [phishing-url-detector-olive.vercel.app](https://phishing-url-detector-olive.vercel.app)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.136-009688?style=flat-square&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4?style=flat-square&logo=axios&logoColor=white)
![httpx](https://img.shields.io/badge/httpx-0.28-009688?style=flat-square&logo=python&logoColor=white)
![VirusTotal](https://img.shields.io/badge/VirusTotal-API%20v3-394EFF?style=flat-square&logo=virustotal&logoColor=white)
![Google Safe Browsing](https://img.shields.io/badge/Google%20Safe%20Browsing-API%20v4-4285F4?style=flat-square&logo=google&logoColor=white)
![dotenv](https://img.shields.io/badge/dotenv-protected-ECD53F?style=flat-square&logo=dotenv&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Cybersecurity%20UI-1572B6?style=flat-square&logo=css3&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)

> Real-time URL threat analyzer that queries 90+ security engines simultaneously using VirusTotal and Google Safe Browsing APIs.

---

## ✨ Features

- 🔍 Real-time analysis with **VirusTotal** (90+ antivirus engines)
- 🛡️ Verification with **Google Safe Browsing API v4**
- 📊 Threat score from 0 to 100 with visual progress bar
- 🎨 Cybersecurity-style UI with scan animations and scanlines effect
- ⚡ Async backend with FastAPI
- 🔒 API keys protected via `.env` file (never exposed to GitHub)

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python 3.11, FastAPI, httpx, python-dotenv |
| Frontend | React 18, Vite 8, Axios, CSS3 |
| Security APIs | VirusTotal API v3, Google Safe Browsing API v4 |
| Dev Tools | Git, GitHub, Uvicorn, npm |

---

## 🚀 Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/VladimirRamirez07/phishing-url-detector.git
cd phishing-url-detector
```

### 2. Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux
pip install -r requirements.txt
```

Create a `.env` file inside `/backend`:

```env
VIRUSTOTAL_API_KEY=your_key_here
GOOGLE_SAFE_BROWSING_API_KEY=your_key_here
```

Start the server:

```bash
uvicorn main:app --reload --port 8080
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Server status |
| POST | `/analyze` | Analyze a URL |

### Request example

```json
{
  "url": "http://example.com"
}
```

### Response example

```json
{
  "url": "http://example.com",
  "threat_score": 43,
  "threat_level": "HIGH",
  "virustotal": {
    "status": "completed",
    "malicious": 14,
    "suspicious": 1,
    "harmless": 47,
    "undetected": 31
  },
  "google_safe_browsing": {
    "status": "completed",
    "threats_found": 0,
    "threat_types": []
  }
}
```

---

## 🎯 Threat Levels

| Score | Level | Description |
|-------|-------|-------------|
| 0 | ✅ SAFE | No threats detected |
| 1-10 | 🟡 LOW | Low risk |
| 11-40 | 🟠 MEDIUM | Moderate risk |
| 41-70 | 🔴 HIGH | High risk |
| 71-100 | ☠️ CRITICAL | Critical threat |

---

## 🔑 Getting API Keys

- **VirusTotal**: Sign up at [virustotal.com](https://www.virustotal.com) → Profile → API Key *(free tier available)*
- **Google Safe Browsing**: Create a project at [console.cloud.google.com](https://console.cloud.google.com) → Credentials → Create API Key *(free)*

---

## 👤 Author

**Vladimir Ramírez**

[![GitHub](https://img.shields.io/badge/GitHub-VladimirRamirez07-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/VladimirRamirez07)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Vladimir%20Ramírez-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vladimir-ramírez-303a433ba)