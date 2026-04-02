from fastapi import APIRouter, Depends, File, UploadFile, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import os
import uuid
from datetime import datetime

from ..database import get_db
from ..models import Resume, User
from ..auth.auth import get_current_user
from ..config import settings

router = APIRouter()

@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Validate file extension
    file_extension = file.filename.split(".")[-1].lower()
    if file_extension not in settings.ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File type {file_extension} not supported. Allowed types: {settings.ALLOWED_EXTENSIONS}"
        )
    
    # Validate file size
    file_content = await file.read()
    if len(file_content) > settings.MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File size too large. Maximum size: {settings.MAX_FILE_SIZE / (1024*1024)} MB"
        )
    
    # Save file to disk
    file_id = str(uuid.uuid4())
    upload_dir = "uploads"
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, f"{file_id}_{file.filename}")
    
    with open(file_path, "wb") as f:
        f.write(file_content)
    
    # Create resume record in database using the exact strict model
    db_resume = Resume(
        user_id=current_user.id,
        file_url=file_path
    )
    
    db.add(db_resume)
    db.commit()
    db.refresh(db_resume)
    
    return {
        "id": db_resume.id,
        "resume_id": db_resume.id,
        "filename": file.filename,
        "uploaded_at": db_resume.created_at
    }

@router.get("/history")
async def get_resume_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    resumes = db.query(Resume).filter(
        Resume.user_id == current_user.id
    ).order_by(Resume.created_at.desc()).all()
    
    # Enrich with ATS Score
    history = []
    for r in resumes:
        score = r.report.ats_score if r.report else None
        history.append({
            "id": r.id,
            "filename": r.file_url.split("_", 1)[-1] if "_" in r.file_url else "resume.pdf",
            "uploaded_at": r.created_at,
            "ats_score": score
        })
        
    return history