import os
import uuid
from pathlib import Path
from typing import BinaryIO

def save_upload_file(upload_file: BinaryIO, destination: Path) -> Path:
    """
    Save an uploaded file to the specified destination
    """
    with open(destination, "wb") as buffer:
        buffer.write(upload_file.read())
    return destination

def generate_unique_filename(original_filename: str) -> str:
    """
    Generate a unique filename by prepending a UUID
    """
    file_extension = Path(original_filename).suffix
    unique_id = str(uuid.uuid4())
    return f"{unique_id}_{original_filename}"

def ensure_directory_exists(path: str) -> None:
    """
    Ensure that the specified directory exists
    """
    os.makedirs(path, exist_ok=True)

def get_file_size(filepath: str) -> int:
    """
    Get the size of a file in bytes
    """
    return os.path.getsize(filepath)

def validate_file_type(filename: str, allowed_extensions: set) -> bool:
    """
    Validate if the file extension is in the allowed set
    """
    file_extension = filename.split(".")[-1].lower()
    return file_extension in allowed_extensions