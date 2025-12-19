SKILLS = [
    "python", "java", "c", "c++", "javascript", "react", "html", "css",
    "machine learning", "deep learning", "sql", "mysql", "mongodb",
    "flask", "django", "aws", "git", "github", "data structures",
    "algorithms", "nlp", "api", "linux"
]

def extract_skills(text):
    found = []
    text = text.lower()
    for skill in SKILLS:
        if skill in text:
            found.append(skill)
    return list(set(found))
