from skill_extractor import SKILLS

def calculate_ats_resume_only(resume_skills, resume_text):
    # Skill score (70%)
    matched = set(resume_skills)
    skill_score = (len(matched) / len(SKILLS)) * 70

    # Length score (30%) - based on text length
    length = len(resume_text.split())
    if length > 400:
        length_score = 30
    elif length > 250:
        length_score = 20
    elif length > 150:
        length_score = 10
    else:
        length_score = 5

    final_score = skill_score + length_score
    return round(min(final_score, 100), 2)
