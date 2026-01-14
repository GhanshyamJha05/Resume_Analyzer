from typing import List, Dict
import json
import numpy as np
from sqlalchemy.orm import Session
from ..models import JobRole, ResumeAnalysis, JobMatch
from ..utils.embedding_utils import compute_embeddings, calculate_cosine_similarity, serialize_embedding, deserialize_embedding
from ..database import get_db

def get_job_matches(analysis: ResumeAnalysis) -> List[Dict]:
    """
    Get job matches for a resume analysis using embeddings and cosine similarity
    """
    # Get all job roles from database
    from ..database import SessionLocal
    db = SessionLocal()
    
    try:
        job_roles = db.query(JobRole).all()
        
        # Extract resume skills from analysis
        resume_skills = json.loads(analysis.extracted_skills) if analysis.extracted_skills else []
        resume_experience = json.loads(analysis.extracted_experience) if analysis.extracted_experience else []
        
        # Create resume profile text
        resume_profile = f"Skills: {', '.join(resume_skills)}. Experience: {' '.join(resume_experience)}."
        
        matches = []
        
        for job_role in job_roles:
            # Calculate match score based on skills
            job_required_skills = json.loads(job_role.required_skills) if job_role.required_skills else []
            
            # Calculate skill match percentage
            if job_required_skills:
                matched_skills = [skill for skill in resume_skills if skill.lower() in [s.lower() for s in job_required_skills]]
                skill_match_percentage = (len(matched_skills) / len(job_required_skills)) * 100
            else:
                skill_match_percentage = 0
            
            # Calculate content similarity using embeddings
            job_profile = f"{job_role.title} {job_role.description} Skills: {', '.join(job_required_skills)}"
            content_similarity = calculate_content_similarity(resume_profile, job_profile)
            
            # Combine both scores (50% skill match, 50% content similarity)
            combined_score = (skill_match_percentage * 0.5) + (content_similarity * 0.5)
            
            matches.append({
                "job_role_id": job_role.id,
                "title": job_role.title,
                "description": job_role.description,
                "required_skills": job_required_skills,
                "match_percentage": round(combined_score, 2),
                "skill_match_percentage": round(skill_match_percentage, 2),
                "content_similarity": round(content_similarity, 2)
            })
        
        # Sort by match percentage and return top 3
        matches.sort(key=lambda x: x["match_percentage"], reverse=True)
        return matches[:3]
        
    finally:
        db.close()

def calculate_content_similarity(resume_text: str, job_text: str) -> float:
    """
    Calculate content similarity between resume and job description using embeddings
    """
    try:
        # Compute embeddings for both texts
        embeddings = compute_embeddings([resume_text, job_text])
        
        if len(embeddings) == 2:
            resume_embedding = embeddings[0]
            job_embedding = embeddings[1]
            
            # Calculate cosine similarity
            similarity = calculate_cosine_similarity(resume_embedding, job_embedding)
            
            # Convert to percentage (0-100)
            return similarity * 100
        else:
            return 0.0
    except Exception:
        # Fallback to simple keyword matching if embeddings fail
        resume_words = set(resume_text.lower().split())
        job_words = set(job_text.lower().split())
        
        if not resume_words or not job_words:
            return 0.0
            
        common_words = resume_words.intersection(job_words)
        similarity = (len(common_words) / max(len(resume_words), len(job_words))) * 100
        return similarity

def initialize_job_role_embeddings():
    """
    Initialize embeddings for job roles (to be called during app startup)
    """
    from ..database import SessionLocal
    db = SessionLocal()
    
    try:
        job_roles = db.query(JobRole).all()
        
        for job_role in job_roles:
            # Create text to embed
            text_to_embed = f"{job_role.title} {job_role.description} Skills: {job_role.required_skills}"
            
            # Compute embedding
            embedding = compute_embeddings(text_to_embed)
            
            # Serialize and save
            job_role.embedding_vector = serialize_embedding(embedding)
        
        db.commit()
    finally:
        db.close()