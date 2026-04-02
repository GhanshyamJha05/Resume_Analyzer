import json
import re
from typing import Dict, Optional
from .llm_service import analyze_resume_with_llm
from .resume_parser import parse_resume

def analyze_resume(file_path: str, job_description: Optional[str] = None) -> Dict:
    """
    Analyze a resume using a single prompt through the LLM.
    Returns the parsed JSON response dict.
    """
    # Parse the resume text
    parsed_resume = parse_resume(file_path)
    resume_text = parsed_resume.get("raw_text", "")
    
    # Run through LLM
    analysis_result_json_str = analyze_resume_with_llm(resume_text, job_description)
    
    # Attempt to clean the response if marked down as json
    cleaned_json = re.sub(r'```json\n(.*?)\n```', r'\1', analysis_result_json_str, flags=re.DOTALL).strip()
    if cleaned_json.startswith("```"):
        cleaned_json = re.sub(r'```(.*?)```', r'\1', cleaned_json, flags=re.DOTALL).strip()
    
    try:
        # Parse the JSON string
        return json.loads(cleaned_json)
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON from LLM: {e}")
        # Fallback if LLM didn't return strict JSON
        return {
            "ats_score": 0,
            "summary": "Error parsing LLM output.",
            "strengths": [],
            "weaknesses": ["Failed to decode AI response"],
            "keyword_analysis": {"matched_keywords": [], "missing_keywords": []},
            "section_feedback": {},
            "bullet_improvements": [],
            "action_plan": [],
            "final_verdict": "Unknown"
        }