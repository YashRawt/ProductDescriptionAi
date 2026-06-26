# Backend Setup Guide

## Product Description Generation AI - Backend

This guide explains how to run the FastAPI backend locally.

---

## Prerequisites

Before starting, make sure you have installed:

* Python 3.10 or later
* pip (Python package manager)
* Git (optional)

You can verify your installation:

```bash
python --version
pip --version
```

---

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

---

## Step 2: Navigate to the Backend Folder

```bash
cd backend
```

---

## Step 3: Create a Virtual Environment

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux / macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

After activation, your terminal should display:

```text
(venv)
```

---

## Step 4: Install Dependencies

Install all required packages.

```bash
pip install -r requirements.txt
```

If a requirements file is not available:

```bash
pip install fastapi uvicorn python-dotenv google-generativeai pydantic
```

---

## Step 5: Configure Environment Variables

Create a file named:

```text
.env
```

Add your API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Replace `your_gemini_api_key_here` with your actual Gemini API key.

---

## Step 6: Start the Development Server

Run:

```bash
uvicorn main:app --reload
```

If your FastAPI app is located elsewhere, adjust the module name accordingly.

Example:

```bash
uvicorn app.main:app --reload
```

---

## Step 7: Open the API

Server:

```
http://127.0.0.1:8000
```

---

## Available API Endpoints

| Method | Endpoint                            | Description                        |
| ------ | ----------------------------------- | ---------------------------------- |
| POST   | `/api/descriptions/generate`        | Generate a product description     |
| POST   | `/api/descriptions`                 | Save a generated description       |
| GET    | `/api/descriptions`                 | List all saved descriptions        |
| GET    | `/api/descriptions/stats`           | Dashboard analytics                |
| GET    | `/api/descriptions/{id}`            | Get a description by ID            |
| PUT    | `/api/descriptions/{id}`            | Update a description               |
| DELETE | `/api/descriptions/{id}`            | Delete a description               |
| POST   | `/api/descriptions/{id}/regenerate` | Regenerate an existing description |

---

## Project Structure

```text
backend/
│
├── main.py
├── ai.py
├── database.py
├── database.json
├── models.py
├── requirements.txt
├── .env
│
└── routers/
    └── descriptions.py
```

---

## Stopping the Server

Press:

```text
CTRL + C
```

to stop the FastAPI server.

---

## Common Issues

### Virtual environment not activated

Activate the virtual environment before installing packages or running the server.

### Module not found

Install missing dependencies:

```bash
pip install -r requirements.txt
```

### Missing Gemini API Key

Ensure the `.env` file exists and contains:

```env
GEMINI_API_KEY=your_api_key
```

### Port Already in Use

Run the server on another port:

```bash
uvicorn main:app --reload --port 8001
```

---

## Development Notes

* Data is stored locally in `database.json`.
* API documentation is automatically generated using FastAPI.
* The backend uses Google's Gemini API to generate AI-powered product descriptions.
* All generated descriptions can be created, updated, deleted, searched, and regenerated through the REST API.

