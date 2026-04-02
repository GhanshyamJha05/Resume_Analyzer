import openai
import json
from typing import Optional
from ..config import settings

MASTER_PROMPT = """You are an expert ATS (Applicant Tracking System), senior recruiter, and career coach with 15+ years of hiring experience across tech, finance, and consulting industries.

Your task is to deeply analyze resumes and provide structured, brutally honest, and actionable feedback.

INPUT:
You will receive:
1. Resume text
2. Optional job description

OUTPUT FORMAT (STRICT JSON):
{
  "ats_score": number (0-100),
  "summary": "short professional evaluation",
  "strengths": ["point1", "point2", ...],
  "weaknesses": ["point1", "point2", ...],
  "keyword_analysis": {
    "matched_keywords": ["..."],
    "missing_keywords": ["..."]
  },
  "section_feedback": {
    "resume_structure": "...",
    "experience": "...",
    "projects": "...",
    "skills": "...",
    "education": "..."
  },
  "bullet_improvements": [
    {
      "original": "...",
      "improved": "..."
    }
  ],
  "action_plan": [
    "Step 1...",
    "Step 2..."
  ],
  "final_verdict": "short hiring decision likelihood"
}

INSTRUCTIONS:
- Be strict like a real ATS system
- Penalize vague, generic resumes
- Prioritize measurable achievements
- Compare resume with job description if provided
- Suggest improvements using strong action verbs
- Avoid fluff or motivational language
- Output must be valid JSON only
"""

def analyze_resume_with_llm(resume_text: str, job_description: Optional[str] = None) -> str:
    """
    Get the strict JSON response from OpenAI using the MASTER_PROMPT
    """
    user_content = f"RESUME TEXT:\n{resume_text}\n"
    if job_description:
        user_content += f"\nJOB DESCRIPTION:\n{job_description}\n"
        
    try:
        if settings.OPENAI_API_KEY:
            openai.api_key = settings.OPENAI_API_KEY
            
            response = openai.ChatCompletion.create(
                model=settings.OPENAI_MODEL,
                messages=[
                    {"role": "system", "content": MASTER_PROMPT},
                    {"role": "user", "content": user_content}
                ],
                max_tokens=2500,
                temperature=0.2
            )
            
            return response.choices[0].message['content'].strip()
        else:
            return _get_mock_json_response()
    except Exception as e:
        print(f"Error calling LLM API: {e}")
        return _get_mock_json_response()

def _get_mock_json_response() -> str:
    return '''{
  "ats_score": 65,
  "summary": "MOCK RESPONSE: Add your OpenAI Key. The resume shows potential but lacks concrete metrics.",
  "strengths": ["Good technical skills", "Relevant education"],
  "weaknesses": ["Missing quantifiable achievements", "Generic summary"],
  "keyword_analysis": {
    "matched_keywords": ["Python", "SQL"],
    "missing_keywords": ["Leadership", "Agile"]
  },
  "section_feedback": {
    "resume_structure": "Standard but could be more modern",
    "experience": "Needs more numbers and impact",
    "projects": "Good projects but missing tech stack details",
    "skills": "Well organized",
    "education": "Clear and concise"
  },
  "bullet_improvements": [
    {
      "original": "Worked on backend",
      "improved": "Engineered scalable backend REST APIs using Python and FastAPI, improving performance by 20%"
    }
  ],
  "action_plan": ["Add active verbs", "Include metrics"],
  "final_verdict": "Likely to be filtered out without improvements"
}'''

def get_llm_response(prompt: str) -> str:
    """Legacy function, kept for backward compatibility if needed elsewhere"""
    return analyze_resume_with_llm(prompt)

async def get_llm_response_async(prompt: str) -> str:
    return get_llm_response(prompt)
