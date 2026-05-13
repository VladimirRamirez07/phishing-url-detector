\# 🛡️ Phishing URL Detector



!\[Python](https://img.shields.io/badge/Python-3.11-blue?style=flat-square\&logo=python)

!\[FastAPI](https://img.shields.io/badge/FastAPI-0.136-009688?style=flat-square\&logo=fastapi)

!\[React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square\&logo=react)

!\[VirusTotal](https://img.shields.io/badge/VirusTotal-API-blue?style=flat-square)

!\[License](https://img.shields.io/badge/License-MIT-green?style=flat-square)



> Analizador de amenazas en tiempo real que consulta más de 90 motores de seguridad simultáneamente.



\## ✨ Features



\- 🔍 Análisis en tiempo real con \*\*VirusTotal\*\* (90+ motores antivirus)

\- 🛡️ Verificación con \*\*Google Safe Browsing API\*\*

\- 📊 Score de amenaza del 0 al 100

\- 🎨 Interfaz cybersecurity con animaciones

\- ⚡ Backend asíncrono con FastAPI



\## 🧰 Tech Stack



| Layer | Tech |

|-------|------|

| Backend | Python, FastAPI, httpx |

| Frontend | React, Vite, Axios |

| APIs | VirusTotal v3, Google Safe Browsing v4 |



\## 🚀 Instalación



\### Backend

```bash

cd backend

python -m venv venv

venv\\Scripts\\activate

pip install -r requirements.txt

```



Crea un archivo `.env` en `/backend`:

```env

VIRUSTOTAL\_API\_KEY=tu\_key\_aqui

GOOGLE\_SAFE\_BROWSING\_API\_KEY=tu\_key\_aqui

```



Inicia el servidor:

```bash

uvicorn main:app --reload --port 8080

```



\### Frontend

```bash

cd frontend

npm install

npm run dev

```



\## 📡 API Endpoints



| Método | Endpoint | Descripción |

|--------|----------|-------------|

| GET | `/` | Status del servidor |

| POST | `/analyze` | Analiza una URL |



\### Ejemplo de respuesta

```json

{

&#x20; "url": "http://ejemplo.com",

&#x20; "threat\_score": 43,

&#x20; "threat\_level": "HIGH",

&#x20; "virustotal": {

&#x20;   "malicious": 14,

&#x20;   "suspicious": 1,

&#x20;   "harmless": 47,

&#x20;   "undetected": 31

&#x20; },

&#x20; "google\_safe\_browsing": {

&#x20;   "threats\_found": 0,

&#x20;   "threat\_types": \[]

&#x20; }

}

```



\## 🎯 Niveles de amenaza



| Score | Nivel | Descripción |

|-------|-------|-------------|

| 0 | ✅ SAFE | Sin amenazas detectadas |

| 1-10 | 🟡 LOW | Riesgo bajo |

| 11-40 | 🟠 MEDIUM | Riesgo moderado |

| 41-70 | 🔴 HIGH | Riesgo alto |

| 71-100 | ☠️ CRITICAL | Amenaza crítica |



\## 👤 Autor



\*\*VladimirRamirez07\*\* — \[GitHub](https://github.com/VladimirRamirez07)

