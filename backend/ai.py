import os
import logging
import httpx

# Setup logging
logger = logging.getLogger("backend.ai")

async def generate_ai_description(name: str, keypoints: str, tone: str, style: str) -> str:
    """Generate product description using Gemini API or fallback template generator."""
    api_key = os.getenv("GEMINI_API_KEY")
    
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
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
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
            if response.status_code == 200:
                data = response.json()
                description_text = data["candidates"][0]["content"]["parts"][0]["text"].strip()
                return description_text
            else:
                logger.error(f"Gemini API returned status {response.status_code}: {response.text}")
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
