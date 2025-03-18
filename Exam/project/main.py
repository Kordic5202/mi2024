from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
from psycopg2.extras import RealDictCursor

app = FastAPI()



# Allow CORS for all origins (for testing, restrict in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to ["http://localhost:5500"] for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Налаштування підключення до БД
DB_NAME = "exam1"
DB_USER = "postgres"         # замініть за потреби
DB_PASSWORD = "admin"     # замініть за потреби
DB_HOST = "localhost"        # або інша адреса/хост, якщо потрібно
DB_PORT = "5432"             # стандартний порт PostgreSQL

@app.get("/data")
def get_locations():
    try:
        connection = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT
        )
        cursor = connection.cursor(cursor_factory=RealDictCursor)

        # Виконуємо SELECT
        cursor.execute("select * FROM battle_reports limit 50;")
        result = cursor.fetchall()

        return {"data": result}

    except Exception as e:
        return {"error": str(e)}
    finally:
        if connection:
            connection.close()
