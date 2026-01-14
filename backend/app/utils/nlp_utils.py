import spacy
import re
from typing import Dict, List, Tuple
import pdfplumber
from docx import Document

# Load spaCy model
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    print("SpaCy model 'en_core_web_sm' not found. Install it using: python -m spacy download en_core_web_sm")
    nlp = None

def extract_entities_with_spacy(text: str) -> Dict:
    """
    Extract entities from text using spaCy
    """
    if not nlp:
        return {"entities": [], "skills": [], "organizations": [], "dates": []}
    
    doc = nlp(text)
    
    entities = []
    skills = []
    organizations = []
    dates = []
    
    # Extract named entities
    for ent in doc.ents:
        entities.append({
            "text": ent.text,
            "label": ent.label_,
            "start": ent.start_char,
            "end": ent.end_char
        })
        
        # Categorize entities
        if ent.label_ in ["ORG", "COMPANY"]:
            organizations.append(ent.text)
        elif ent.label_ == "DATE":
            dates.append(ent.text)
    
    # Extract skills (this is a simplified approach - in practice you'd have a skills database)
    # For now, we'll look for capitalized words that might be skills
    # In a real implementation, you'd use a predefined skills database
    skill_keywords = [
        "python", "javascript", "react", "node", "sql", "machine learning", "data science",
        "java", "c++", "html", "css", "angular", "vue", "docker", "kubernetes", "aws", "azure",
        "git", "agile", "scrum", "mongodb", "postgresql", "mysql", "tensorflow", "pytorch"
    ]
    
    text_lower = text.lower()
    for skill in skill_keywords:
        if skill in text_lower:
            skills.append(skill.title())
    
    # Remove duplicates
    skills = list(set(skills))
    organizations = list(set(organizations))
    dates = list(set(dates))
    
    return {
        "entities": entities,
        "skills": skills,
        "organizations": organizations,
        "dates": dates
    }

def extract_email(text: str) -> str:
    """
    Extract email from text using regex
    """
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    emails = re.findall(email_pattern, text)
    return emails[0] if emails else None

def extract_phone_number(text: str) -> str:
    """
    Extract phone number from text using regex
    """
    phone_pattern = r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}'
    phones = re.findall(phone_pattern, text)
    return phones[0] if phones else None

def extract_name(text: str) -> str:
    """
    Extract name from text (usually the first capitalized words at the beginning)
    """
    lines = text.split('\n')[:5]  # Look at first 5 lines
    
    for line in lines:
        line = line.strip()
        # Look for capitalized words at the beginning
        # This is a heuristic - in practice you'd need more sophisticated NLP
        if line and line[0].isupper():
            # Check if it looks like a name (capitalized words, no punctuation at the end)
            if not line.endswith(('.', ',', ';', ':')) and len(line.split()) <= 3:
                # Verify it's likely a name (contains capitalized words)
                words = line.split()
                if all(word[0].isupper() for word in words if len(word) > 1):
                    return line
    
    return None

def parse_pdf(file_path: str) -> str:
    """
    Parse text content from PDF file
    """
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text

def parse_docx(file_path: str) -> str:
    """
    Parse text content from DOCX file
    """
    doc = Document(file_path)
    text = []
    for paragraph in doc.paragraphs:
        text.append(paragraph.text)
    return '\n'.join(text)

def clean_text(text: str) -> str:
    """
    Clean extracted text by removing extra whitespace and normalizing
    """
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text)
    # Remove special characters but keep basic punctuation
    text = re.sub(r'[^\w\s\-\.,;:!?\'\"]', ' ', text)
    return text.strip()