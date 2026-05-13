import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeUrl = async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await axios.post("http://127.0.0.1:8080/analyze", { url });
      setResult(response.data);
    } catch (err) {
      setError("Error al analizar la URL. Verifica que el backend esté corriendo.");
    }
    setLoading(false);
  };

  const getThreatColor = (level) => {
    const colors = { SAFE: "#00ff88", LOW: "#aaff00", MEDIUM: "#ffaa00", HIGH: "#ff6600", CRITICAL: "#ff0000" };
    return colors[level] || "#ffffff";
  };

  const getThreatEmoji = (level) => {
    const emojis = { SAFE: "✅", LOW: "🟡", MEDIUM: "🟠", HIGH: "🔴", CRITICAL: "☠️" };
    return emojis[level] || "❓";
  };

  const getThreatLabel = (level) => {
    const labels = { SAFE: "SEGURO", LOW: "BAJO", MEDIUM: "MEDIO", HIGH: "ALTO", CRITICAL: "CRÍTICO" };
    return labels[level] || level;
  };

  return (
    <div className="app">
      <div className="scanlines" />
      <div className="container">

        <div className="header">
          <div className="logo-icon">🛡️</div>
          <h1 className="title">PHISHING<span>DETECTOR</span></h1>
          <p className="subtitle">// Sistema de análisis de amenazas en tiempo real</p>
          <div className="header-tags">
            <span className="tag">VirusTotal API</span>
            <span className="tag">Google Safe Browsing</span>
            <span className="tag active">● ONLINE</span>
          </div>
        </div>

        <div className="terminal-box">
          <div className="terminal-header">
            <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
            <span className="terminal-title">threat_scanner.exe</span>
          </div>
          <div className="terminal-body">
            <span className="prompt">root@detector:~$</span>
            <span className="prompt-text"> scan --url</span>
            <div className="input-row">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && analyzeUrl()}
                placeholder="https://url-a-analizar.com"
                className="url-input"
              />
              <button onClick={analyzeUrl} disabled={loading} className="analyze-btn">
                {loading ? (
                  <span className="scanning">
                    <span className="scan-dot" />ESCANEANDO
                  </span>
                ) : "ANALIZAR →"}
              </button>
            </div>
          </div>
        </div>

        {error && <div className="error-box"><span>⚠</span> {error}</div>}

        {loading && (
          <div className="loading-box">
            <div className="scan-bar" />
            <p>Consultando bases de datos de amenazas...</p>
          </div>
        )}

        {result && (
          <div className="result-card">
            <div className="threat-header" style={{ borderColor: getThreatColor(result.threat_level) }}>
              <div className="threat-left">
                <span className="threat-emoji">{getThreatEmoji(result.threat_level)}</span>
                <div>
                  <div className="threat-label">NIVEL DE AMENAZA</div>
                  <div className="threat-level" style={{ color: getThreatColor(result.threat_level) }}>
                    {getThreatLabel(result.threat_level)}
                  </div>
                </div>
              </div>
              <div className="score-circle" style={{ borderColor: getThreatColor(result.threat_level) }}>
                <span className="score-num" style={{ color: getThreatColor(result.threat_level) }}>
                  {result.threat_score}
                </span>
                <span className="score-max">/100</span>
              </div>
            </div>

            <div className="score-bar-container">
              <div className="score-bar-bg">
                <div
                  className="score-bar-fill"
                  style={{
                    width: `${Math.min(result.threat_score, 100)}%`,
                    background: getThreatColor(result.threat_level),
                  }}
                />
              </div>
              <div className="score-bar-labels">
                <span>SEGURO</span><span>BAJO</span><span>MEDIO</span><span>ALTO</span><span>CRÍTICO</span>
              </div>
            </div>

            <div className="url-analyzed">
              <span className="url-label">URL ANALIZADA:</span>
              <span className="url-value">{result.url}</span>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-card-header">
                  <span>🦠</span><h3>VIRUSTOTAL</h3>
                  <span className={`status-badge ${result.virustotal.status}`}>{result.virustotal.status}</span>
                </div>
                <div className="stat-rows">
                  <div className="stat-row malicious">
                    <span>● Maliciosos</span><span className="stat-val">= {result.virustotal.malicious}</span>
                  </div>
                  <div className="stat-row suspicious">
                    <span>● Sospechosos</span><span className="stat-val">= {result.virustotal.suspicious}</span>
                  </div>
                  <div className="stat-row harmless">
                    <span>● Seguros</span><span className="stat-val">= {result.virustotal.harmless}</span>
                  </div>
                  <div className="stat-row undetected">
                    <span>● No detectados</span><span className="stat-val">= {result.virustotal.undetected}</span>
                  </div>
                  <div className="stat-row total">
                    <span>TOTAL MOTORES</span>
                    <span className="stat-val">= {result.virustotal.malicious + result.virustotal.suspicious + result.virustotal.harmless + result.virustotal.undetected}</span>
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-card-header">
                  <span>🛡️</span><h3>GOOGLE SAFE BROWSING</h3>
                  <span className={`status-badge ${result.google_safe_browsing.threats_found > 0 ? "error" : "completed"}`}>
                    {result.google_safe_browsing.status}
                  </span>
                </div>
                <div className="stat-rows">
                  <div className={`stat-row ${result.google_safe_browsing.threats_found > 0 ? "malicious" : "harmless"}`}>
                    <span>● Amenazas detectadas</span>
                    <span className="stat-val">= {result.google_safe_browsing.threats_found}</span>
                  </div>
                  {result.google_safe_browsing.threat_types?.length > 0 ? (
                    result.google_safe_browsing.threat_types.map((t, i) => (
                      <div key={i} className="threat-tag">{t}</div>
                    ))
                  ) : (
                    <div className="stat-row harmless"><span>● Sin amenazas conocidas</span></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="footer">
          <span>PHISHING DETECTOR v1.0</span>
          <span>|</span>
          <span>VladimirRamirez07</span>
          <span>|</span>
          <span>GitHub</span>
        </div>
      </div>
    </div>
  );
}

export default App;