from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text, DateTime, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base
import uuid

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    resumes = relationship("Resume", back_populates="owner")
    analyses = relationship("ResumeAnalysis", back_populates="owner")


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    filename = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    owner_id = Column(String, ForeignKey("users.id"))
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Extracted fields
    name = Column(String)
    email = Column(String)
    phone = Column(String)
    summary = Column(Text)
    
    # Relationships
    owner = relationship("User", back_populates="resumes")
    analysis = relationship("ResumeAnalysis", back_populates="resume", uselist=False)


class ResumeAnalysis(Base):
    __tablename__ = "resume_analyses"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    resume_id = Column(String, ForeignKey("resumes.id"))
    owner_id = Column(String, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Scores
    ats_score = Column(Float)
    keyword_match_score = Column(Float)
    skill_coverage_score = Column(Float)
    
    # Content analysis
    extracted_skills = Column(Text)  # JSON string
    extracted_education = Column(Text)  # JSON string
    extracted_experience = Column(Text)  # JSON string
    extracted_projects = Column(Text)  # JSON string
    
    # Issues detected
    missing_skills = Column(Text)  # JSON string
    weak_bullet_points = Column(Text)  # JSON string
    
    # AI suggestions
    ai_suggestions = Column(Text)  # JSON string
    improved_bullets = Column(Text)  # JSON string
    
    # Relationships
    resume = relationship("Resume", back_populates="analysis")
    owner = relationship("User", back_populates="analyses")


class JobRole(Base):
    __tablename__ = "job_roles"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    required_skills = Column(Text)  # JSON string of skills
    embedding_vector = Column(Text)  # JSON string of embedding vector
    
    # Relationships
    matches = relationship("JobMatch", back_populates="job_role")


class JobMatch(Base):
    __tablename__ = "job_matches"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    resume_analysis_id = Column(String, ForeignKey("resume_analyses.id"))
    job_role_id = Column(String, ForeignKey("job_roles.id"))
    match_percentage = Column(Float, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    analysis = relationship("ResumeAnalysis")
    job_role = relationship("JobRole", back_populates="matches")