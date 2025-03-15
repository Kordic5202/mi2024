from fastapi import FastAPI, Request, Depends
import asyncpg
from typing import List
from pydantic import BaseModel
from datetime import date
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

# Database configuration
DATABASE_URL = "postgresql://postgres:admin@localhost/personnel_db"

app = FastAPI(title="Personnel API", description="CRUD with Buttons & Chart", version="1.0")

# Serve static files (for JavaScript)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Jinja2 Templates
templates = Jinja2Templates(directory="templates")

# Connect to PostgreSQL
async def get_db():
    return await asyncpg.connect(DATABASE_URL)

# Pydantic model
class Personnel(BaseModel):
    full_name: str
    rank: str
    birth_date: date

class PersonnelWithID(Personnel):
    id: int

# Initialize table
@app.on_event("startup")
async def startup():
    db = await get_db()
    await db.execute("""
        CREATE TABLE IF NOT EXISTS personnel (
            id SERIAL PRIMARY KEY,
            full_name TEXT NOT NULL,
            rank TEXT NOT NULL,
            birth_date DATE NOT NULL
        );
    """)
    await db.close()

# Add personnel (API)
@app.post("/personnel/", response_model=PersonnelWithID)
async def add_personnel(person: Personnel):
    db = await get_db()
    row = await db.fetchrow(
        "INSERT INTO personnel (full_name, rank, birth_date) VALUES ($1, $2, $3) RETURNING id, full_name, rank, birth_date;",
        person.full_name, person.rank, person.birth_date
    )
    await db.close()
    return dict(row)

# Update personnel (API)
@app.put("/personnel/{person_id}/")
async def update_personnel(person_id: int, person: Personnel):
    db = await get_db()
    await db.execute("UPDATE personnel SET full_name=$1, rank=$2, birth_date=$3 WHERE id=$4;",
                     person.full_name, person.rank, person.birth_date, person_id)
    await db.close()
    return {"message": "Updated successfully"}

# Delete personnel (API)
@app.delete("/personnel/{person_id}/")
async def delete_personnel(person_id: int):
    db = await get_db()
    await db.execute("DELETE FROM personnel WHERE id=$1;", person_id)
    await db.close()
    return {"message": "Deleted successfully"}

# List personnel (API)
@app.get("/personnel/", response_model=List[PersonnelWithID])
async def list_personnel():
    db = await get_db()
    rows = await db.fetch("SELECT id, full_name, rank, birth_date FROM personnel;")
    await db.close()
    return [dict(row) for row in rows]

# Render HTML page with personnel list and chart
@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
