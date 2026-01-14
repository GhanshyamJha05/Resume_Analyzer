from typing import Optional
import re

def validate_email(email: str) -> bool:
    """
    Validate email format
    """
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_password(password: str) -> bool:
    """
    Validate password strength
    - At least 8 characters
    - Contains uppercase, lowercase, and numeric characters
    """
    if len(password) < 8:
        return False
    
    has_upper = any(c.isupper() for c in password)
    has_lower = any(c.islower() for c in password)
    has_digit = any(c.isdigit() for c in password)
    
    return has_upper and has_lower and has_digit

def validate_file_type(filename: str, allowed_extensions: set) -> bool:
    """
    Validate if the file extension is in the allowed set
    """
    file_extension = filename.split(".")[-1].lower()
    return file_extension in allowed_extensions

def validate_file_size(file_size: int, max_size: int) -> bool:
    """
    Validate if the file size is within the allowed limit
    """
    return file_size <= max_size

def sanitize_input(input_str: str) -> str:
    """
    Sanitize input string to prevent injection attacks
    """
    # Remove potentially dangerous characters
    sanitized = input_str.replace('<', '&lt;').replace('>', '&gt;')
    sanitized = sanitized.replace('"', '&quot;').replace("'", '&#x27;')
    sanitized = sanitized.replace('/', '&#x2F;').replace('\\', '&#x5C;')
    return sanitized