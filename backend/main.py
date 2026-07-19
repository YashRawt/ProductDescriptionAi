import os
import logging
from contextlib import asynccontextmanager
from pathlib import Path
from dotenv import load_dotenv
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

# Import database lifecycle operations
from database import init_db, close_db
from rate_limit import limiter

# Load environment variables from the backend folder so the API key is found
# regardless of the current working directory.
load_dotenv(dotenv_path=Path(__file__).with_name(".env"))

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("backend")


def _allowed_origins() -> list[str]:
    origins = {"http://localhost:5173"}
    frontend_origin = os.getenv("FRONTEND_ORIGIN")
    if frontend_origin:
        origins.add(frontend_origin.rstrip("/"))
    return sorted(origins)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting up: initializing MongoDB connection...")
    try:
        await init_db()
    except Exception as e:
        logger.critical(f"Database initialization failed: {e}. Continuing without an active database connection.")
    yield
    # Shutdown
    logger.info("Shutting down: closing MongoDB connection...")
    await close_db()

app = FastAPI(
    title="Product Description AI API",
    description="Backend API for generating and managing AI product descriptions",
    version="1.0.0",
    lifespan=lifespan
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
from routers.auth import router as auth_router
from routers.descriptions import router as descriptions_router
app.include_router(auth_router)
app.include_router(descriptions_router)

# --- Global Exception Handlers ---

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """
    Catch Pydantic validation errors and return 400 Bad Request
    instead of the default 422 Unprocessable Entity.
    """
    errors = exc.errors()
    error_messages = []
    for error in errors:
        loc = " -> ".join([str(x) for x in error.get("loc", [])])
        msg = error.get("msg", "Validation failed")
        error_messages.append(f"{loc}: {msg}")
    
    detail_msg = "; ".join(error_messages) or "Validation failed."
    logger.warning(f"Validation error on {request.url.path}: {detail_msg}")
    
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={"detail": detail_msg}
    )

@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    """
    Pass Starlette/FastAPI HTTPExceptions (like 404, 403, 400 raised manually)
    through to the client directly with their custom details.
    """
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )

@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    """
    Global catch-all for any unhandled exceptions, returning a 500 error.
    """
    logger.exception(f"Unhandled server error on {request.url.path}: {exc}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An internal server error occurred."}
    )

if __name__ == "__main__":
    import uvicorn
    # Use env settings or fallback to localhost:8000
    host = os.getenv("HOST", "127.0.0.1")
    port = int(os.getenv("PORT", "8000"))
    logger.info(f"Starting server on {host}:{port}")
    uvicorn.run("main:app", host=host, port=port, reload=True)
