def calculate_ats(resume_skills, jd_skills):
    resume_set = set(resume_skills)
    jd_set = set(jd_skills)

    matched = resume_set.intersection(jd_set)
    missing = jd_set - resume_set

    score = (len(matched) / len(jd_set)) * 100 if jd_set else 0
    return round(score, 2), list(matched), list(missing)
