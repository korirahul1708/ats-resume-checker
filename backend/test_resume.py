from resume_parser import extract_resume_text
from text_cleaner import clean_text
from skill_extractor import extract_skills
from ats_score import calculate_ats

resume_text = extract_resume_text("sample_resume.pdf")
clean_resume = clean_text(resume_text)
resume_skills = extract_skills(clean_resume)

jd = """
Looking for a software engineer with strong Python, React, SQL, Git,
and data structures knowledge. Experience with AWS is a plus.
"""

clean_jd = clean_text(jd)
jd_skills = extract_skills(clean_jd)

score, matched, missing = calculate_ats(resume_skills, jd_skills)

print("Resume Skills:", resume_skills)
print("JD Skills:", jd_skills)
print("ATS Score:", score)
print("Matched:", matched)
print("Missing:", missing)
