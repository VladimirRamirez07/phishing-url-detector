from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

VIRUSTOTAL_API_KEY = os.getenv("VIRUSTOTAL_API_KEY")
GOOGLE_API_KEY = os.getenv("GOOGLE_SAFE_BROWSING_API_KEY")

class URLRequest(BaseModel):
    url: str

@app.get("/")
def root():
    return {"status": "Phishing URL Detector API running"}

@app.post("/analyze")
async def analyze_url(request: URLRequest):
    url = request.url
    vt_result = await check_virustotal(url)
    gsb_result = await check_safe_browsing(url)
    
    threat_score = calculate_threat_score(vt_result, gsb_result)
    
    return {
        "url": url,
        "threat_score": threat_score,
        "threat_level": get_threat_level(threat_score),
        "virustotal": vt_result,
        "google_safe_browsing": gsb_result,
    }

async def check_virustotal(url: str):
    import base64
    url_id = base64.urlsafe_b64encode(url.encode()).decode().strip("=")
    headers = {"x-apikey": VIRUSTOTAL_API_KEY}
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(
                f"https://www.virustotal.com/api/v3/urls/{url_id}",
                headers=headers,
                timeout=15
            )
            if response.status_code == 200:
                data = response.json()
                stats = data["data"]["attributes"]["last_analysis_stats"]
                return {
                    "status": "completed",
                    "malicious": stats.get("malicious", 0),
                    "suspicious": stats.get("suspicious", 0),
                    "harmless": stats.get("harmless", 0),
                    "undetected": stats.get("undetected", 0),
                }
            else:
                # Submit URL for analysis
                submit = await client.post(
                    "https://www.virustotal.com/api/v3/urls",
                    headers=headers,
                    data={"url": url},
                    timeout=15
                )
                return {"status": "submitted", "malicious": 0, "suspicious": 0, "harmless": 0, "undetected": 0}
        except Exception as e:
            return {"status": "error", "error": str(e)}

async def check_safe_browsing(url: str):
    payload = {
        "client": {"clientId": "phishing-detector", "clientVersion": "1.0"},
        "threatInfo": {
            "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
            "platformTypes": ["ANY_PLATFORM"],
            "threatEntryTypes": ["URL"],
            "threatEntries": [{"url": url}]
        }
    }
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"https://safebrowsing.googleapis.com/v4/threatMatches:find?key={GOOGLE_API_KEY}",
                json=payload,
                timeout=15
            )
            data = response.json()
            threats = data.get("matches", [])
            return {
                "status": "completed",
                "threats_found": len(threats),
                "threat_types": [t.get("threatType") for t in threats]
            }
        except Exception as e:
            return {"status": "error", "error": str(e)}

def calculate_threat_score(vt: dict, gsb: dict) -> int:
    score = 0
    score += vt.get("malicious", 0) * 3
    score += vt.get("suspicious", 0) * 1
    score += gsb.get("threats_found", 0) * 30
    return min(score, 100)

def get_threat_level(score: int) -> str:
    if score == 0:
        return "SAFE"
    elif score <= 10:
        return "LOW"
    elif score <= 40:
        return "MEDIUM"
    elif score <= 70:
        return "HIGH"
    else:
        return "CRITICAL"