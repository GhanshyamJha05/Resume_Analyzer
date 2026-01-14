from sentence_transformers import SentenceTransformer
import numpy as np
from typing import List, Union
import json

class EmbeddingModel:
    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        self.model = SentenceTransformer(model_name)
    
    def encode(self, texts: Union[str, List[str]]) -> np.ndarray:
        """
        Encode text(s) into embeddings
        """
        return self.model.encode(texts)
    
    def cosine_similarity(self, vec1: np.ndarray, vec2: np.ndarray) -> float:
        """
        Calculate cosine similarity between two vectors
        """
        if len(vec1.shape) == 1:
            vec1 = vec1.reshape(1, -1)
        if len(vec2.shape) == 1:
            vec2 = vec2.reshape(1, -1)
            
        # Normalize vectors
        vec1 = vec1 / np.linalg.norm(vec1, axis=1, keepdims=True)
        vec2 = vec2 / np.linalg.norm(vec2, axis=1, keepdims=True)
        
        # Compute cosine similarity
        similarity = np.dot(vec1, vec2.T)
        return float(similarity[0][0])

# Global embedding model instance
embedding_model = EmbeddingModel()

def compute_embeddings(texts: Union[str, List[str]]) -> Union[np.ndarray, List[np.ndarray]]:
    """
    Compute embeddings for text(s)
    """
    return embedding_model.encode(texts)

def calculate_cosine_similarity(vec1: np.ndarray, vec2: np.ndarray) -> float:
    """
    Calculate cosine similarity between two embedding vectors
    """
    return embedding_model.cosine_similarity(vec1, vec2)

def serialize_embedding(embedding: np.ndarray) -> str:
    """
    Serialize embedding vector to JSON string
    """
    return json.dumps(embedding.tolist())

def deserialize_embedding(embedding_str: str) -> np.ndarray:
    """
    Deserialize embedding vector from JSON string
    """
    if not embedding_str:
        return np.array([])
    return np.array(json.loads(embedding_str))