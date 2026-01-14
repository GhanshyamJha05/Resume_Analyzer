import os
from typing import Dict, List
from ..utils.nlp_utils import (
    parse_pdf, parse_docx, extract_entities_with_spacy, 
    extract_email, extract_phone_number, extract_name, clean_text
)

def parse_resume(file_path: str) -> Dict:
    """
    Parse resume file and extract relevant information
    """
    # Determine file type and parse accordingly
    file_extension = file_path.split(".")[-1].lower()
    
    if file_extension == "pdf":
        text_content = parse_pdf(file_path)
    elif file_extension == "docx":
        text_content = parse_docx(file_path)
    else:
        raise ValueError(f"Unsupported file type: {file_extension}")
    
    # Clean the extracted text
    cleaned_text = clean_text(text_content)
    
    # Extract entities using spaCy
    entities = extract_entities_with_spacy(cleaned_text)
    
    # Extract specific information using regex
    name = extract_name(cleaned_text)
    email = extract_email(cleaned_text)
    phone = extract_phone_number(cleaned_text)
    
    # Extract summary/objective (usually the first paragraph after name)
    lines = cleaned_text.split('\n')
    summary = ""
    for i, line in enumerate(lines):
        line = line.strip()
        if line and name and name.lower() not in line.lower():
            # Look for summary/objective keywords
            if any(keyword in line.lower() for keyword in ["summary", "objective", "about"]):
                if i + 1 < len(lines):
                    summary = lines[i + 1].strip()
                break
            # Or just take the first substantial paragraph after name
            elif len(line) > 50 and not email or email not in line:
                summary = line
                break
    
    # Extract experience, education, and projects
    experience = extract_section(cleaned_text, ["experience", "work", "employment", "professional"])
    education = extract_section(cleaned_text, ["education", "degree", "university", "college", "school"])
    projects = extract_section(cleaned_text, ["projects", "project"])
    
    return {
        "name": name,
        "email": email,
        "phone": phone,
        "summary": summary,
        "skills": entities["skills"],
        "organizations": entities["organizations"],
        "experience": experience,
        "education": education,
        "projects": projects,
        "raw_text": cleaned_text
    }

def extract_section(text: str, keywords: List[str]) -> List[str]:
    """
    Extract a section from text based on keywords
    """
    lines = text.split('\n')
    section_lines = []
    in_section = False
    
    for line in lines:
        line_lower = line.lower()
        
        # Check if this line contains section header
        if any(keyword in line_lower for keyword in keywords):
            in_section = True
            continue
        
        # If we're in the section and encounter another header, stop
        if in_section and any(other_keyword in line_lower for other_keyword in 
                             ["skills", "summary", "objective", "contact", "email", "phone", "name"] 
                             if other_keyword not in keywords):
            break
        
        if in_section and line.strip():
            section_lines.append(line.strip())
    
    return section_lines