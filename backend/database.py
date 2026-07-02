import os
import json
import logging
from typing import Optional
from motor.motor_asyncio import AsyncIOMotorClient

# Setup logging
logger = logging.getLogger("backend.database")

# Environment variables & constants
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/product_description_ai")
DB_FILE = os.path.join(os.path.dirname(__file__), "database.json")

# Database client references
client: Optional[AsyncIOMotorClient] = None
db = None

def get_db():
    """Retrieve database instance."""
    global db
    if db is None:
        raise RuntimeError("Database not initialized. Call init_db() first.")
    return db

def get_client():
    """Retrieve database client instance."""
    global client
    return client

async def init_db():
    """Initialize MongoDB connection, check status, and migrate legacy JSON data."""
    global client, db
    
    # Hide credential part for safe logging
    safe_uri = MONGODB_URI.split("@")[-1] if "@" in MONGODB_URI else MONGODB_URI
    logger.info(f"Connecting to MongoDB database using URI: {safe_uri}")
    
    try:
        # Initialize AsyncIOMotorClient
        client = AsyncIOMotorClient(MONGODB_URI)
        # Verify connection by pinging
        await client.admin.command('ping')
        
        # Access database (retrieve default DB from URI, fallback to 'product_description_ai')
        db = client.get_default_database(default="product_description_ai")
        
        logger.info("Successfully connected to MongoDB.")
        
        # Run legacy migration check
        await run_legacy_migration()
        
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        raise e

async def close_db():
    """Close MongoDB connection."""
    global client, db
    if client:
        client.close()
        logger.info("MongoDB connection closed.")
    client = None
    db = None

async def run_legacy_migration():
    """If the descriptions collection is empty, load items from database.json and seed them."""
    global db
    collection = db.descriptions
    
    count = await collection.count_documents({})
    if count > 0:
        logger.info("MongoDB already contains data. Skipping legacy migration.")
        return
        
    if not os.path.exists(DB_FILE):
        logger.info("No legacy database.json found. Skipping migration.")
        return
        
    logger.info("MongoDB 'descriptions' collection is empty. Attempting legacy migration from database.json...")
    
    try:
        with open(DB_FILE, "r", encoding="utf-8") as f:
            legacy_data = json.load(f)
            
        if not legacy_data:
            logger.info("Legacy database.json is empty. Nothing to migrate.")
            return
            
        seeded_count = 0
        for item in legacy_data:
            # Map legacy 'id' string to '_id' in MongoDB
            if "id" in item:
                item["_id"] = item.pop("id")
            
            await collection.insert_one(item)
            seeded_count += 1
            
        logger.info(f"Successfully migrated {seeded_count} records from database.json to MongoDB.")
        
    except Exception as e:
        logger.error(f"Error during legacy database migration: {e}")

def map_description(doc: dict) -> dict:
    """Helper to convert MongoDB document _id to id string."""
    if not doc:
        return doc
    doc = dict(doc)
    doc["id"] = str(doc.pop("_id"))
    return doc
