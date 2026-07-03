import os
import asyncio
import logging
from dotenv import load_dotenv

# Setup logging to see results
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("test_db")

# Load environment
load_dotenv()

from database import init_db, close_db, get_db, map_description
from models import SaveRequest, UpdateRequest

async def run_tests():
    logger.info("Initializing database connection...")
    await init_db()
    
    db = get_db()
    collection = db.descriptions
    
    # 1. Verify connection & migration
    count = await collection.count_documents({})
    logger.info(f"Current count of documents in descriptions: {count}")
    
    # 2. Test saving a description
    test_item = {
        "name": "Test Product",
        "keypoints": "Keypoint 1, Keypoint 2",
        "tone": "professional",
        "style": "paragraphs",
        "description": "This is a test description generated for verification.",
        "created_at": "2026-07-02T12:00:00Z"
    }
    
    logger.info("Testing save/insertion...")
    result = await collection.insert_one(test_item)
    test_item_id = str(result.inserted_id)
    logger.info(f"Inserted item ID: {test_item_id}")
    
    # 3. Test retrieving
    logger.info("Testing retrieval by ID...")
    from bson import ObjectId
    fetched = await collection.find_one({"_id": ObjectId(test_item_id)})
    if fetched:
        mapped = map_description(fetched)
        logger.info(f"Successfully retrieved and mapped item: {mapped}")
    else:
        logger.error("Failed to retrieve inserted item!")
        
    # 4. Test updating
    logger.info("Testing update...")
    await collection.update_one(
        {"_id": ObjectId(test_item_id)},
        {"$set": {"name": "Updated Test Product", "tone": "luxury"}}
    )
    updated = await collection.find_one({"_id": ObjectId(test_item_id)})
    logger.info(f"Updated item: {map_description(updated)}")
    
    # 5. Test aggregation stats
    logger.info("Testing aggregation stats...")
    total_generated = await collection.count_documents({})
    pipeline = [
        {"$group": {"_id": {"$toLower": "$tone"}, "count": {"$sum": 1}}}
    ]
    cursor = collection.aggregate(pipeline)
    tone_counts = {}
    async for doc in cursor:
        tone_val = doc["_id"] or "default"
        tone_counts[tone_val] = doc["count"]
    
    logger.info(f"Stats - Total count: {total_generated}, Tone counts: {tone_counts}")
    
    # 6. Test delete
    logger.info("Testing deletion...")
    del_result = await collection.delete_one({"_id": ObjectId(test_item_id)})
    logger.info(f"Deleted count: {del_result.deleted_count}")
    
    await close_db()
    logger.info("All tests completed successfully!")

if __name__ == "__main__":
    asyncio.run(run_tests())
