import openai
from typing import Optional
from ..config import settings

def get_llm_response(prompt: str) -> str:
    """
    Get response from LLM (OpenAI or similar)
    """
    try:
        if settings.OPENAI_API_KEY:
            # Use OpenAI API
            openai.api_key = settings.OPENAI_API_KEY
            
            response = openai.ChatCompletion.create(
                model=settings.OPENAI_MODEL,
                messages=[
                    {"role": "system", "content": "You are an expert resume analyzer and career advisor. Provide concise, actionable feedback."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500,
                temperature=0.7
            )
            
            return response.choices[0].message['content'].strip()
        else:
            # Fallback response when no API key is provided
            return get_fallback_response(prompt)
    except Exception as e:
        print(f"Error calling LLM API: {e}")
        return get_fallback_response(prompt)

def get_fallback_response(prompt: str) -> str:
    """
    Fallback response when LLM API is not available
    """
    # This is a very basic fallback - in a real app, you might want to implement
    # more sophisticated fallback logic or use an open-source model
    if "suggestions" in prompt.lower():
        return (
            "1. Quantify your achievements with specific metrics\n"
            "2. Use strong action verbs at the beginning of bullet points\n"
            "3. Include relevant keywords from job descriptions\n"
            "4. Ensure consistent formatting throughout\n"
            "5. Proofread for grammar and spelling errors"
        )
    elif "improve" in prompt.lower() or "star" in prompt.lower():
        return (
            "Consider starting with a strong action verb, describing the situation, "
            "explaining the task, detailing the action you took, and quantifying the result."
        )
    else:
        return "Based on the analysis, focus on highlighting quantifiable achievements, using industry-relevant keywords, and ensuring consistent formatting throughout your resume."

# Async version for use with async functions
async def get_llm_response_async(prompt: str) -> str:
    """
    Async version of get_llm_response
    """
    return get_llm_response(prompt)