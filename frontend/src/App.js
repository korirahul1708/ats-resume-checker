import React, { useState } from "react";

function App() {
  const [resume, setResume] = useState(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jd", jd);

    const res = await fetch("http://127.0.0.1:5000/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h2>ATS Resume Checker</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResume(e.target.files[0])}
          required
        />
        <br /><br />

        <textarea
          rows="6"
          cols="60"
          placeholder="Paste Job Description here..."
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Analyze</button>
      </form>

      {result && (
        <div style={{ marginTop: "30px" }}>
          <h3>ATS Score: {result.ats_score}%</h3>
          <p><b>Matched Skills:</b> {result.matched.join(", ")}</p>
          <p><b>Missing Skills:</b> {result.missing.join(", ")}</p>
        </div>
      )}
    </div>
  );
}

export default App;
