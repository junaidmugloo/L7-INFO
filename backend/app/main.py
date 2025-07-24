from fastapi import FastAPI
from routers import movies, actors, directors, genres
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="🎬 Movie Explorer API",
    description="Explore movies, actors, directors and genres!",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace '*' with specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(movies.router)
app.include_router(actors.router)
app.include_router(directors.router)
app.include_router(genres.router)
