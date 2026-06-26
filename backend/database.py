import os
import json
import logging
from typing import List, Dict, Any

# Setup logging
logger = logging.getLogger("backend.database")

DB_FILE = os.path.join(os.path.dirname(__file__), "database.json")

def load_db() -> List[Dict[str, Any]]:
    """Load records from the JSON database file."""
    if not os.path.exists(DB_FILE):
        return []
    try:
        with open(DB_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Error loading database file: {e}")
        return []

def save_db(data: List[Dict[str, Any]]) -> bool:
    """Save records to the JSON database file."""
    try:
        with open(DB_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, default=str)
        return True
    except Exception as e:
        logger.error(f"Error saving database file: {e}")
        return False
