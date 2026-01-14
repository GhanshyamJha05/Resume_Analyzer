from fastapi import APIRouter, Depends, File, UploadFile, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import os
import uuid
from datetime import datetime

from ..database import get_db
from ..models import Resume, User
from ..auth.auth import get_current_user
from ..services.resume_parser import parse_resume
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
    
    # Parse resume content
    try:
        parsed_data = parse_resume(file_path)
    except Exception as e:
        # Clean up the file if parsing fails
        os.remove(file_path)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to parse resume: {str(e)}"
        )
    
    # Create resume record in database
    db_resume = Resume(
        filename=file.filename,
        file_path=file_path,
        owner_id=current_user.id,
        name=parsed_data.get('name'),
        email=parsed_data.get('email'),
        phone=parsed_data.get('phone'),
        summary=parsed_data.get('summary')
    )
    
    db.add(db_resume)
    db.commit()
    db.refresh(db_resume)
    
    return {
        "id": db_resume.id,
        "filename": db_resume.filename,
        "uploaded_at": db_resume.uploaded_at,
        "parsed_data": parsed_data
    }

@router.get("/history")
async def get_resume_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    resumes = db.query(Resume).filter(Resume.owner_id == current_user.id).order_by(Resume.uploaded_at.desc()).all()
    return resumes