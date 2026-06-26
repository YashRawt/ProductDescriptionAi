import uuid
import logging
from datetime import datetime
from typing import List, Optional

from fastapi import APIRouter, HTTPException, status, Query

# Import from local modules (available on sys.path when running main.py)
from database import load_db, save_db
from models import (
    GenerateRequest,
    GenerateResponse,
    DescriptionItem,
    SaveRequest,
    UpdateRequest,
    DashboardStats
)
from ai import generate_ai_description

# Setup logging
logger = logging.getLogger("backend.routers.descriptions")

router = APIRouter(
    prefix="/api/descriptions",
    tags=["descriptions"]
)

# 1. POST /api/descriptions/generate - Generate draft (Does NOT save to database)
@router.post("/generate", response_model=GenerateResponse, status_code=status.HTTP_200_OK)
async def generate_draft(req: GenerateRequest):
    try:
        generated_text = await generate_ai_description(req.name, req.keypoints, req.tone, req.style)
        return GenerateResponse(
            name=req.name,
            keypoints=req.keypoints,
            tone=req.tone,
            style=req.style,
            description=generated_text
        )
    except Exception as e:
        logger.error(f"Generation endpoint failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while generating description: {str(e)}"
        )

# 2. POST /api/descriptions - Save description
@router.post("", response_model=DescriptionItem, status_code=status.HTTP_201_CREATED)
async def save_description(req: SaveRequest):
    if not req.name.strip() or not req.description.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Product name and generated description cannot be empty."
        )
        
    db_data = load_db()
    
    new_item = {
        "id": str(uuid.uuid4()),
        "name": req.name,
        "keypoints": req.keypoints,
        "tone": req.tone,
        "style": req.style,
        "description": req.description,
        "created_at": datetime.utcnow().isoformat()
    }
    
    db_data.insert(0, new_item)  # Insert at the beginning (most recent first)
    if save_db(db_data):
        return DescriptionItem(**new_item)
    else:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save product description to the database."
        )

# 3. GET /api/descriptions - List all saved descriptions (with search query and tone filter)
@router.get("", response_model=List[DescriptionItem], status_code=status.HTTP_200_OK)
async def list_descriptions(
    q: Optional[str] = Query(None, description="Search query matching product name, keypoints, or description"),
    tone: Optional[str] = Query(None, description="Filter descriptions by tone")
):
    db_data = load_db()
    filtered = db_data
    
    if tone:
        filtered = [item for item in filtered if item.get("tone", "").lower() == tone.lower()]
        
    if q:
        q_lower = q.lower()
        filtered = [
            item for item in filtered
            if q_lower in item.get("name", "").lower()
            or q_lower in item.get("keypoints", "").lower()
            or q_lower in item.get("description", "").lower()
        ]
        
    return [DescriptionItem(**item) for item in filtered]

# 4. GET /api/descriptions/stats - Dashboard analytics stats
@router.get("/stats", response_model=DashboardStats, status_code=status.HTTP_200_OK)
async def get_stats():
    db_data = load_db()
    
    tone_counts = {}
    for item in db_data:
        t = item.get("tone", "default").lower()
        tone_counts[t] = tone_counts.get(t, 0) + 1
        
    recent = db_data[:5]
    
    return DashboardStats(
        total_generated=len(db_data),
        tone_counts=tone_counts,
        recent_activity=recent
    )

# 5. GET /api/descriptions/{id} - Get single description
@router.get("/{id}", response_model=DescriptionItem, status_code=status.HTTP_200_OK)
async def get_description(id: str):
    db_data = load_db()
    for item in db_data:
        if item.get("id") == id:
            return DescriptionItem(**item)
            
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Product description with ID '{id}' not found."
    )

# 6. PUT /api/descriptions/{id} - Update description
@router.put("/{id}", response_model=DescriptionItem, status_code=status.HTTP_200_OK)
async def update_description(id: str, req: UpdateRequest):
    db_data = load_db()
    item_index = -1
    
    for idx, item in enumerate(db_data):
        if item.get("id") == id:
            item_index = idx
            break
            
    if item_index == -1:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product description with ID '{id}' not found."
        )
        
    target_item = db_data[item_index]
    
    # Update fields if provided
    if req.name is not None:
        target_item["name"] = req.name
    if req.keypoints is not None:
        target_item["keypoints"] = req.keypoints
    if req.tone is not None:
        target_item["tone"] = req.tone
    if req.style is not None:
        target_item["style"] = req.style
    if req.description is not None:
        target_item["description"] = req.description
        
    db_data[item_index] = target_item
    
    if save_db(db_data):
        return DescriptionItem(**target_item)
    else:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update product description in the database."
        )

# 7. DELETE /api/descriptions/{id} - Delete description
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_description(id: str):
    db_data = load_db()
    item_index = -1
    
    for idx, item in enumerate(db_data):
        if item.get("id") == id:
            item_index = idx
            break
            
    if item_index == -1:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product description with ID '{id}' not found."
        )
        
    db_data.pop(item_index)
    
    if save_db(db_data):
        return None
    else:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete product description from the database."
        )

# 8. POST /api/descriptions/{id}/regenerate - Regenerate a description by ID
@router.post("/{id}/regenerate", response_model=DescriptionItem, status_code=status.HTTP_200_OK)
async def regenerate_description(id: str):
    db_data = load_db()
    item_index = -1
    
    for idx, item in enumerate(db_data):
        if item.get("id") == id:
            item_index = idx
            break
            
    if item_index == -1:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product description with ID '{id}' not found."
        )
        
    item = db_data[item_index]
    
    try:
        new_text = await generate_ai_description(
            item.get("name"),
            item.get("keypoints", ""),
            item.get("tone", "professional"),
            item.get("style", "paragraphs")
        )
        
        item["description"] = new_text
        db_data[item_index] = item
        
        if save_db(db_data):
            return DescriptionItem(**item)
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to save regenerated description to the database."
            )
    except Exception as e:
        logger.error(f"Regeneration endpoint failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred during regeneration: {str(e)}"
        )
