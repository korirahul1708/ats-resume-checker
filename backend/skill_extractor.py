SKILLS = [
    "python", "java", "c", "c++", "javascript", "react",
    "html", "css", "machine learning", "sql", "mysql",
    "mongodb", "flask", "aws", "git", "github",
    "data structures", "algorithms", "api"
]


def extract_skills(text):
    found = []
    text = text.lower()
    for skill in SKILLS:
        if skill in text:
            found.append(skill)
    return list(set(found))
