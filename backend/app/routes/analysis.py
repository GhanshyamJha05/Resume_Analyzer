from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import json

from ..database import get_db
from ..models import Resume, Report, User
from ..auth.auth import get_current_user
from ..services.analysis_service import analyze_resume

router = APIRouter()

@router.post("/{resume_id}/analyze")
async def analyze_resume_endpoint(
    resume_id: str,
    job_description: str = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Get the resume
    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == current_user.id
    ).first()
    
    if not resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume not found or access denied"
        )
    
    # Perform analysis
    analysis_result = analyze_resume(resume.file_url, job_description)
    
    # Store full AI response in result_json as requested
    db_report = Report(
        resume_id=resume.id,
        user_id=current_user.id,
        ats_score=analysis_result.get('ats_score', 0),
        result_json=json.dumps(analysis_result)
    )
    
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    
    return analysis_result

@router.get("/{resume_id}/analysis")
async def get_analysis(
    resume_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    report = db.query(Report).filter(
        Report.resume_id == resume_id,
        Report.user_id == current_user.id
    ).first()
    
    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis report not found or access denied"
        )
    
    # Safe parse of the JSON we stored
    try:
        data = json.loads(report.result_json)
    except:
        data = {}
        
    return data