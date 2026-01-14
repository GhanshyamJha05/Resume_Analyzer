from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import json

from ..database import get_db
from ..models import Resume, ResumeAnalysis, User, JobMatch
from ..auth.auth import get_current_user
from ..services.analysis_service import analyze_resume
from ..services.job_matching_service import get_job_matches

router = APIRouter()

@router.post("/{resume_id}/analyze")
async def analyze_resume_endpoint(
    resume_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Get the resume
    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.owner_id == current_user.id
    ).first()
    
    if not resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume not found or access denied"
        )
    
    # Perform analysis
    analysis_result = analyze_resume(resume.file_path)
    
    # Create analysis record
    db_analysis = ResumeAnalysis(
        resume_id=resume.id,
        owner_id=current_user.id,
        ats_score=analysis_result['ats_score'],
        keyword_match_score=analysis_result['keyword_match_score'],
        skill_coverage_score=analysis_result['skill_coverage_score'],
        extracted_skills=json.dumps(analysis_result['extracted_skills']),
        extracted_education=json.dumps(analysis_result['extracted_education']),
        extracted_experience=json.dumps(analysis_result['extracted_experience']),
        extracted_projects=json.dumps(analysis_result['extracted_projects']),
        missing_skills=json.dumps(analysis_result['missing_skills']),
        weak_bullet_points=json.dumps(analysis_result['weak_bullet_points']),
        ai_suggestions=json.dumps(analysis_result['ai_suggestions']),
        improved_bullets=json.dumps(analysis_result['improved_bullets'])
    )
    
    db.add(db_analysis)
    db.commit()
    db.refresh(db_analysis)
    
    return analysis_result

@router.get("/{resume_id}/analysis")
async def get_analysis(
    resume_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    analysis = db.query(ResumeAnalysis).filter(
        ResumeAnalysis.resume_id == resume_id,
        ResumeAnalysis.owner_id == current_user.id
    ).first()
    
    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found or access denied"
        )
    
    return {
        "ats_score": analysis.ats_score,
        "keyword_match_score": analysis.keyword_match_score,
        "skill_coverage_score": analysis.skill_coverage_score,
        "extracted_skills": json.loads(analysis.extracted_skills) if analysis.extracted_skills else [],
        "extracted_education": json.loads(analysis.extracted_education) if analysis.extracted_education else [],
        "extracted_experience": json.loads(analysis.extracted_experience) if analysis.extracted_experience else [],
        "extracted_projects": json.loads(analysis.extracted_projects) if analysis.extracted_projects else [],
        "missing_skills": json.loads(analysis.missing_skills) if analysis.missing_skills else [],
        "weak_bullet_points": json.loads(analysis.weak_bullet_points) if analysis.weak_bullet_points else [],
        "ai_suggestions": json.loads(analysis.ai_suggestions) if analysis.ai_suggestions else [],
        "improved_bullets": json.loads(analysis.improved_bullets) if analysis.improved_bullets else []
    }