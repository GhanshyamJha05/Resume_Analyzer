import re
from typing import Dict, List
from ..utils.embedding_utils import compute_embeddings, calculate_cosine_similarity
from ..utils.nlp_utils import extract_entities_with_spacy
from .llm_service import get_llm_response
from .resume_parser import parse_resume

def analyze_resume(file_path: str) -> Dict:
    """
    Analyze a resume and return comprehensive insights
    """
    # Parse the resume
    parsed_resume = parse_resume(file_path)
    
    # Calculate ATS score (based on various factors)
    ats_score = calculate_ats_score(parsed_resume)
    
    # Calculate keyword match score
    keyword_match_score = calculate_keyword_match_score(parsed_resume)
    
    # Calculate skill coverage score
    skill_coverage_score = calculate_skill_coverage_score(parsed_resume)
    
    # Extract weaknesses
    missing_skills = identify_missing_skills(parsed_resume)
    weak_bullet_points = identify_weak_bullet_points(parsed_resume)
    
    # Generate AI suggestions
    ai_suggestions = generate_ai_suggestions(parsed_resume)
    
    # Improve bullet points using STAR method
    improved_bullets = improve_bullet_points(parsed_resume)
    
    return {
        "ats_score": ats_score,
        "keyword_match_score": keyword_match_score,
        "skill_coverage_score": skill_coverage_score,
        "extracted_skills": parsed_resume["skills"],
        "extracted_education": parsed_resume["education"],
        "extracted_experience": parsed_resume["experience"],
        "extracted_projects": parsed_resume["projects"],
        "missing_skills": missing_skills,
        "weak_bullet_points": weak_bullet_points,
        "ai_suggestions": ai_suggestions,
        "improved_bullets": improved_bullets
    }

def calculate_ats_score(parsed_resume: Dict) -> float:
    """
    Calculate ATS score based on various factors
    """
    score = 0.0
    
    # Factor 1: Contact information present (10 points)
    if parsed_resume.get("name") and parsed_resume.get("email"):
        score += 10
    
    # Factor 2: Skills section present (15 points)
    if parsed_resume.get("skills"):
        score += 15
    
    # Factor 3: Education section present (10 points)
    if parsed_resume.get("education"):
        score += 10
    
    # Factor 4: Experience section present (15 points)
    if parsed_resume.get("experience"):
        score += 15
    
    # Factor 5: Proper formatting (20 points)
    # Check for consistent formatting patterns
    raw_text = parsed_resume.get("raw_text", "")
    if has_good_formatting(raw_text):
        score += 20
    
    # Factor 6: Keyword density (30 points)
    keyword_density_score = calculate_keyword_density_score(raw_text)
    score += keyword_density_score
    
    # Normalize to 0-100 scale
    return min(score, 100.0)

def has_good_formatting(text: str) -> bool:
    """
    Check if the resume has good formatting
    """
    # Check for consistent use of bullet points
    bullet_patterns = [r'\s•\s', r'\s-\s', r'\s\*\s']
    bullet_count = sum(len(re.findall(pattern, text)) for pattern in bullet_patterns)
    
    # Check for consistent date formatting
    date_patterns = [r'\d{1,2}/\d{1,2}/\d{4}', r'(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}']
    date_count = sum(len(re.findall(pattern, text, re.IGNORECASE)) for pattern in date_patterns)
    
    # Check for section headers (all caps or bold-like formatting)
    section_headers = ['SUMMARY', 'EXPERIENCE', 'EDUCATION', 'SKILLS', 'PROJECTS']
    header_count = sum(1 for header in section_headers if header in text)
    
    return bullet_count >= 3 or date_count >= 2 or header_count >= 3

def calculate_keyword_density_score(text: str) -> float:
    """
    Calculate score based on keyword density
    """
    # Define important keywords for resumes
    important_keywords = [
        'experience', 'skills', 'education', 'projects', 'responsibilities',
        'managed', 'led', 'developed', 'designed', 'implemented', 'optimized',
        'python', 'javascript', 'java', 'react', 'node', 'sql', 'machine learning'
    ]
    
    text_lower = text.lower()
    found_keywords = [kw for kw in important_keywords if kw.lower() in text_lower]
    
    # Calculate density score (max 30 points)
    density_ratio = len(found_keywords) / len(important_keywords)
    return density_ratio * 30

def calculate_keyword_match_score(parsed_resume: Dict) -> float:
    """
    Calculate how well the resume matches common job keywords
    """
    # Common job-related keywords
    job_keywords = [
        'leadership', 'team', 'collaboration', 'problem solving', 'communication',
        'analytical', 'creative', 'innovative', 'results-oriented', 'deadline',
        'agile', 'scrum', 'continuous improvement', 'customer focus'
    ]
    
    raw_text = parsed_resume.get("raw_text", "").lower()
    found_keywords = [kw for kw in job_keywords if kw.lower() in raw_text]
    
    return (len(found_keywords) / len(job_keywords)) * 100

def calculate_skill_coverage_score(parsed_resume: Dict) -> float:
    """
    Calculate how well the resume covers common technical skills
    """
    # Common technical skills
    common_skills = [
        'python', 'javascript', 'java', 'c++', 'react', 'node', 'sql', 'html', 'css',
        'git', 'docker', 'aws', 'azure', 'gcp', 'linux', 'agile', 'scrum'
    ]
    
    resume_skills = [skill.lower() for skill in parsed_resume.get("skills", [])]
    found_skills = [skill for skill in common_skills if skill in resume_skills]
    
    return (len(found_skills) / len(common_skills)) * 100

def identify_missing_skills(parsed_resume: Dict) -> List[str]:
    """
    Identify skills that are commonly required but missing from the resume
    """
    # Commonly required skills
    required_skills = [
        'Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'Git', 'Docker', 
        'AWS', 'Azure', 'Machine Learning', 'Data Analysis', 'Project Management',
        'Communication', 'Leadership', 'Problem Solving', 'Teamwork'
    ]
    
    resume_skills = [skill.lower() for skill in parsed_resume.get("skills", [])]
    missing_skills = [
        skill for skill in required_skills 
        if skill.lower() not in resume_skills
    ]
    
    return missing_skills[:10]  # Return top 10 missing skills

def identify_weak_bullet_points(parsed_resume: Dict) -> List[str]:
    """
    Identify weak bullet points in the resume
    """
    weak_starters = [
        'worked on', 'helped with', 'was responsible for', 
        'did', 'made', 'created', 'assisted'
    ]
    
    experience_text = ' '.join(parsed_resume.get("experience", []))
    lines = experience_text.split('.')
    
    weak_points = []
    for line in lines:
        line_lower = line.lower().strip()
        if any(starter in line_lower for starter in weak_starters):
            if len(line.strip()) > 10:  # Avoid very short lines
                weak_points.append(line.strip())
    
    return weak_points[:5]  # Return top 5 weak bullet points

def generate_ai_suggestions(parsed_resume: Dict) -> List[str]:
    """
    Generate AI-powered suggestions for resume improvement
    """
    prompt = f"""
    Analyze this resume and provide 5 specific suggestions for improvement:
    
    Name: {parsed_resume.get('name', 'Not provided')}
    Email: {parsed_resume.get('email', 'Not provided')}
    Summary: {parsed_resume.get('summary', 'Not provided')}
    Skills: {', '.join(parsed_resume.get('skills', []))}
    Experience: {'; '.join(parsed_resume.get('experience', []))}
    Education: {'; '.join(parsed_resume.get('education', []))}
    Projects: {'; '.join(parsed_resume.get('projects', []))}
    
    Provide specific, actionable suggestions focusing on:
    1. Content improvements
    2. Formatting enhancements
    3. Keyword optimization
    4. Skill highlighting
    5. Achievement quantification
    """
    
    response = get_llm_response(prompt)
    return response.split('\n') if response else []

def improve_bullet_points(parsed_resume: Dict) -> List[Dict[str, str]]:
    """
    Improve bullet points using STAR method
    """
    experience_text = ' '.join(parsed_resume.get("experience", []))
    lines = experience_text.split('.')
    
    improvements = []
    for line in lines[:3]:  # Process first 3 bullet points
        if line.strip() and len(line.strip()) > 10:
            prompt = f"""
            Convert this resume bullet point to follow the STAR method (Situation, Task, Action, Result):
            Original: {line.strip()}
            
            Provide an improved version that:
            1. Starts with a strong action verb
            2. Quantifies achievements where possible
            3. Shows impact and results
            4. Is concise but descriptive
            """
            
            improved = get_llm_response(prompt)
            if improved:
                improvements.append({
                    "original": line.strip(),
                    "improved": improved
                })
    
    return improvements