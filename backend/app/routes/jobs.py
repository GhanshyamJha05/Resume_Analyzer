from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import json

from ..database import get_db
from ..models import Resume, ResumeAnalysis, User, JobRole, JobMatch
from ..auth.auth import get_current_user
from ..services.job_matching_service import get_job_matches

router = APIRouter()

@router.get("/roles")
async def get_job_roles(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    roles = db.query(JobRole).all()
    return roles

@router.post("/seed-roles")
async def seed_job_roles(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Define predefined job roles
    job_roles = [
        {
            "title": "Software Engineer",
            "description": "Develops, tests, and maintains software applications using various programming languages and frameworks.",
            "required_skills": ["Python", "JavaScript", "React", "Node.js", "SQL", "Git", "Agile"]
        },
        {
            "title": "Backend Developer",
            "description": "Designs, develops, and maintains server-side logic, databases, and application integrations.",
            "required_skills": ["Python", "Java", "Node.js", "SQL", "PostgreSQL", "Redis", "Docker", "AWS"]
        },
        {
            "title": "Frontend Developer",
            "description": "Creates user interfaces and experiences using HTML, CSS, JavaScript, and modern frameworks.",
            "required_skills": ["HTML", "CSS", "JavaScript", "React", "Vue.js", "TypeScript", "Webpack", "Responsive Design"]
        },
        {
            "title": "Data Scientist",
            "description": "Analyzes complex datasets to extract meaningful insights and build predictive models.",
            "required_skills": ["Python", "R", "SQL", "Machine Learning", "Statistics", "Pandas", "NumPy", "TensorFlow"]
        },
        {
            "title": "ML Engineer",
            "description": "Builds and deploys machine learning models in production environments.",
            "required_skills": ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Docker", "Kubernetes", "Cloud Platforms", "MLOps"]
        }
    ]
    
    # Clear existing roles
    db.query(JobRole).delete()
    
    # Add new roles
    for role_data in job_roles:
        job_role = JobRole(
            title=role_data["title"],
            description=role_data["description"],
            required_skills=json.dumps(role_data["required_skills"]),
            embedding_vector=""  # Will be computed during initialization
        )
        db.add(job_role)
    
    db.commit()
    
    return {"message": f"Added {len(job_roles)} job roles"}

@router.get("/{resume_id}/matches")
async def get_resume_job_matches(
    resume_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Get the resume analysis
    analysis = db.query(ResumeAnalysis).filter(
        ResumeAnalysis.resume_id == resume_id,
        ResumeAnalysis.owner_id == current_user.id
    ).first()
    
    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume analysis not found or access denied"
        )
    
    # Get job matches
    matches = get_job_matches(analysis)
    
    return matches