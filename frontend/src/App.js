import React, { useState } from "react";
import "./App.css";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";



function App() {
  const [resume, setResume] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) return alert("Please upload resume");

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      const res = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      // optional delay for loader
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setResult(data);
    } catch (err) {
      alert("Backend not reachable. Is Flask running?");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <div className="app">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true, zIndex: 0 },
          particles: {
            number: { value: 60 },
            color: { value: "#2563eb" },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: 3 },
            move: { enable: true, speed: 1 },
            links: {
              enable: true,
              distance: 150,
              color: "#2563eb",
              opacity: 0.4,
              width: 1,
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
            },
          },
          detectRetina: true,
        }}
      />

      {/* 🧾 Main Card UI */}
      <div className="card">
        <h1>ATS Resume Checker</h1>
        <p className="subtitle">
          Upload your resume and get your ATS score instantly
        </p>

        <form onSubmit={handleSubmit}>
          <label className="label">Upload Resume (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files[0])}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Analyzing..." : "Check ATS Score"}
          </button>
        </form>

        {/* 🔄 Spinner */}
        {loading && <div className="spinner"></div>}

        {/* ✅ Result */}
        {result && !loading && (
          <div className="result">
            <h2>Your ATS Score: {result.ats_score}%</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
