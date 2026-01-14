"""
Application startup script to initialize job roles and embeddings
"""
from .database import SessionLocal
from .models import JobRole
from .services.job_matching_service import initialize_job_role_embeddings
from .config import settings
import json

def init_db():
    """
    Initialize the database with predefined job roles
    """
    db = SessionLocal()
    try:
        # Check if job roles already exist
        existing_roles = db.query(JobRole).count()
        if existing_roles > 0:
            print("Job roles already exist in database")
            return
        
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
        
        # Add job roles to database
        for role_data in job_roles:
            job_role = JobRole(
                title=role_data["title"],
                description=role_data["description"],
                required_skills=json.dumps(role_data["required_skills"]),
                embedding_vector=""  # Will be computed during initialization
            )
            db.add(job_role)
        
        db.commit()
        print(f"Added {len(job_roles)} job roles to database")
        
        # Initialize embeddings for job roles
        print("Initializing embeddings for job roles...")
        initialize_job_role_embeddings()
        print("Job role embeddings initialized successfully")
        
    finally:
        db.close()

if __name__ == "__main__":
    init_db()