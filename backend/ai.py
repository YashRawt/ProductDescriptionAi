import os
import logging
from pathlib import Path

from dotenv import load_dotenv
import httpx

# Setup logging
logger = logging.getLogger("backend.ai")

# Load backend-local environment variables so the Gemini key is available when
# this module is imported outside of main.py as well.
load_dotenv(dotenv_path=Path(__file__).with_name(".env"))

async def generate_ai_description(name: str, keypoints: str, tone: str, style: str) -> str:
    """Generate product description using Gemini API or fallback template generator."""
    api_key = os.getenv("GEMINI_API_KEY")
    model_name = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
    
    # Prompt construction
    prompt = (
        f"You are an expert e-commerce copywriter. Generate a high-quality product description for a product named '{name}'.\n"
        f"Key features and details: '{keypoints}'.\n"
        f"The tone must be: '{tone}'.\n"
        f"The style and structure must be: '{style}'.\n"
        f"Write a compelling description that turns features into customer benefits.\n"
        f"Return ONLY the generated description text. Do not include markdown headers, HTML, intro sentences like 'Here is your description', or surrounding quotes."
    )

    if not api_key:
        logger.warning("GEMINI_API_KEY is not set. Using template-based fallback generator.")
        return fallback_generate(name, keypoints, tone, style)

    # Use actual Gemini API
    url = (
        "https://generativelanguage.googleapis.com/v1beta/models/"
        f"{model_name}:generateContent?key={api_key}"
    )
    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ]
    }
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(url, json=payload)
            response.raise_for_status()

            data = response.json()
            candidates = data.get("candidates") or []
            if candidates:
                content = candidates[0].get("content") or {}
                parts = content.get("parts") or []
                if parts:
                    text = parts[0].get("text", "").strip()
                    if text:
                        return text

            logger.error(f"Gemini API returned an unexpected response shape: {data}")
            return fallback_generate(name, keypoints, tone, style)
    except Exception as e:
        logger.error(f"Error calling Gemini API: {e}")
        return fallback_generate(name, keypoints, tone, style)

def fallback_generate(name: str, keypoints: str, tone: str, style: str) -> str:
    """Fallback local generator in case Gemini API is not configured or fails."""
    # Formatting helper for features
    features = [f.strip() for f in keypoints.split(",") if f.strip()]
    feature_list = ", ".join(features) if features else "premium quality"

    # Tone logic
    if tone.lower() in ["luxury", "elegant"]:
        desc = (
            f"Indulge in the unparalleled sophistication of the new {name}. "
            f"Meticulously engineered and highlighting premium details like {feature_list}, "
            f"this masterfully crafted solution is designed specifically for discerning customers who refuse to compromise on quality and aesthetic excellence. "
            f"Experience elevated utility combined with timeless beauty in every detail."
        )
    elif tone.lower() in ["health related", "health", "wellness", "calm"]:
        desc = (
            f"Nurture your everyday wellness and vitality with the {name}. "
            f"Thoughtfully constructed to support a balanced, active lifestyle, it integrates key elements including {feature_list}. "
            f"This gentle, health-conscious product provides the safe, reliable support you need to feel your best every day."
        )
    elif tone.lower() in ["professional", "corporate", "business"]:
        desc = (
            f"Optimize your workspace productivity with the high-performance {name}. "
            f"Built for modern business professionals and featuring key capabilities like {feature_list}, "
            f"this robust utility ensures maximum efficiency, seamless workflow integration, and a sleek, professional aesthetic that fits perfectly in any office environment."
        )
    else:  # default / creative / friendly
        desc = (
            f"Meet the all-new {name}—your ultimate companion for a smarter lifestyle. "
            f"Featuring {feature_list}, it is built to deliver everyday convenience and outstanding reliability. "
            f"Whether you are upgrading your routine or searching for the perfect solution, it offers the ideal balance of functionality, durability, and modern style."
        )

    # Style modifications
    if "bullet" in style.lower() or "list" in style.lower():
        bullets = "\n".join([f"• {f.capitalize()}" for f in features])
        desc = f"{desc}\n\nKey Highlights:\n{bullets}"
    elif "concise" in style.lower() or "short" in style.lower():
        desc = f"Introducing {name}, boasting {feature_list}. The perfect blend of efficiency and quality designed for your daily needs."
        
    return desc
