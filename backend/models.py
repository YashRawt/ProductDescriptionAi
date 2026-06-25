from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class GenerateRequest(BaseModel):
    name: str = Field(..., min_length=1, description="Name of the product")
    keypoints: str = Field(..., min_length=1, description="Comma-separated product features/keypoints")
    tone: str = Field("professional", description="Tone of the description (professional, health related, luxury, etc.)")
    style: str = Field("paragraphs", description="Style of the description (paragraphs, bullet points, concise, etc.)")

class GenerateResponse(BaseModel):
    name: str
    keypoints: str
    tone: str
    style: str
    description: str

class DescriptionItem(BaseModel):
    id: str
    name: str
    keypoints: str
    tone: str
    style: str
    description: str
    created_at: str

class SaveRequest(BaseModel):
    name: str = Field(..., min_length=1, description="Name of the product")
    keypoints: str = Field("", description="Comma-separated product features/keypoints")
    tone: str = Field("professional", description="Tone of the description")
    style: str = Field("paragraphs", description="Style of the description")
    description: str = Field(..., min_length=1, description="Generated description")

class UpdateRequest(BaseModel):
    name: Optional[str] = None
    keypoints: Optional[str] = None
    tone: Optional[str] = None
    style: Optional[str] = None
    description: Optional[str] = None

class DashboardStats(BaseModel):
    total_generated: int
    tone_counts: Dict[str, int]
    recent_activity: List[Dict[str, Any]]
