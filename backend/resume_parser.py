from pdfminer.high_level import extract_text

def extract_resume_text(pdf_path):
    text = extract_text(pdf_path)
    return text
