from flask import Flask, request, jsonify
from flask_cors import CORS

from resume_parser import extract_resume_text
from text_cleaner import clean_text
from skill_extractor import extract_skills
from ats_score import calculate_ats_resume_only

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "ATS Checker API is running!"

@app.route("/analyze", methods=["POST"])
def analyze():
    if "resume" not in request.files:
        return jsonify({"error": "Resume file missing"}), 400

    resume_file = request.files["resume"]
    resume_file.save("temp_resume.pdf")

    resume_text = extract_resume_text("temp_resume.pdf")
    clean_resume = clean_text(resume_text)
    resume_skills = extract_skills(clean_resume)

    score = calculate_ats_resume_only(resume_skills, clean_resume)

    return jsonify({
    "ats_score": score,
    "keywords": resume_skills
})


if __name__ == "__main__":
    app.run(debug=True)
