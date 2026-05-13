# 🛡️ Phishing URL Detector

![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.136-009688?style=flat-square&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)

> Analizador de amenazas en tiempo real que consulta más de 90 motores de seguridad simultáneamente.

## ✨ Features

- 🔍 Análisis en tiempo real con **VirusTotal** (90+ motores antivirus)
- 🛡️ Verificación con **Google Safe Browsing API**
- 📊 Score de amenaza del 0 al 100 con barra visual
- 🎨 Interfaz estilo cybersecurity con animaciones
- ⚡ Backend asíncrono con FastAPI

## 🧰 Tech Stack

| Layer | Tech |
|-------|------|
| Backend | Python, FastAPI, httpx, python-dotenv |
| Frontend | React, Vite, Axios |
| APIs | VirusTotal v3, Google Safe Browsing v4 |

## 🚀 Instalación local

### 1. Clona el repositorio

```bash
git clone https://github.com/VladimirRamirez07/phishing-url-detector.git
cd phishing-url-detector
```

### 2. Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Crea un archivo `.env` en `/backend`:

```env
VIRUSTOTAL_API_KEY=tu_key_aqui
GOOGLE_SAFE_BROWSING_API_KEY=tu_key_aqui
```

Inicia el servidor:

```bash
uvicorn main:app --reload --port 8080
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Abre http://localhost:5173 en tu navegador.

## 📡 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Status del servidor |
| POST | `/analyze` | Analiza una URL |

### Ejemplo de request

```json
{
  "url": "http://ejemplo.com"
}
```

### Ejemplo de respuesta

```json
{
  "url": "http://ejemplo.com",
  "threat_score": 43,
  "threat_level": "HIGH",
  "virustotal": {
    "malicious": 14,
    "suspicious": 1,
    "harmless": 47,
    "undetected": 31
  },
  "google_safe_browsing": {
    "threats_found": 0,
    "threat_types": []
  }
}
```

## 🎯 Niveles de amenaza

| Score | Nivel | Descripción |
|-------|-------|-------------|
| 0 | ✅ SAFE | Sin amenazas detectadas |
| 1-10 | 🟡 LOW | Riesgo bajo |
| 11-40 | 🟠 MEDIUM | Riesgo moderado |
| 41-70 | 🔴 HIGH | Riesgo alto |
| 71-100 | ☠️ CRITICAL | Amenaza crítica |

## 🔑 Obtener API Keys

- **VirusTotal**: Regístrate en [virustotal.com](https://www.virustotal.com) → Perfil → API Key
- **Google Safe Browsing**: Crea un proyecto en [console.cloud.google.com](https://console.cloud.google.com) → Credenciales → Crear clave de API

## 👤 Autor

**VladimirRamirez07** — [GitHub](https://github.com/VladimirRamirez07)