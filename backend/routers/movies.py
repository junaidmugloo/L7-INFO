from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app import models, schemas
from app.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

router = APIRouter(prefix="/movies", tags=["Movies"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CREATE
@router.post("/", response_model=schemas.Movie)
def create_movie(movie: schemas.MovieCreate, db: Session = Depends(get_db)):
    db_movie = models.Movie(
        title=movie.title,
        release_year=movie.release_year,
        rating=movie.rating,
        director_id=movie.director_id,
    )
    db.add(db_movie)
    db.commit()
    db.refresh(db_movie)

    for gid in movie.genre_ids:
        genre = db.query(models.Genre).filter(models.Genre.id == gid).first()
        if genre:
            db_movie.genres.append(genre)

    for aid in movie.actor_ids:
        actor = db.query(models.Actor).filter(models.Actor.id == aid).first()
        if actor:
            db_movie.actors.append(actor)

    db.commit()
    return db_movie

# READ ALL (With filters)
@router.get("/", response_model=List[schemas.Movie])
def get_movies(
    genre: str = None,
    director: str = None,
    year: int = None,
    actor: str = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Movie)

    if genre:
        query = query.join(models.Movie.genres).filter(models.Genre.name == genre)
    if director:
        query = query.join(models.Movie.director).filter(models.Director.name == director)
    if year:
        query = query.filter(models.Movie.release_year == year)
    if actor:
        query = query.join(models.Movie.actors).filter(models.Actor.name == actor)

    return query.all()

# READ ONE
@router.get("/{movie_id}", response_model=schemas.Movie)
def get_movie(movie_id: int, db: Session = Depends(get_db)):
    movie = db.query(models.Movie).filter(models.Movie.id == movie_id).first()
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie

# UPDATE
@router.put("/{movie_id}", response_model=schemas.Movie)
def update_movie(movie_id: int, movie_data: schemas.MovieCreate, db: Session = Depends(get_db)):
    movie = db.query(models.Movie).filter(models.Movie.id == movie_id).first()
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")

    movie.title = movie_data.title
    movie.release_year = movie_data.release_year
    movie.rating = movie_data.rating
    movie.director_id = movie_data.director_id

    # Update genres
    movie.genres = []
    for gid in movie_data.genre_ids:
        genre = db.query(models.Genre).filter(models.Genre.id == gid).first()
        if genre:
            movie.genres.append(genre)

    # Update actors
    movie.actors = []
    for aid in movie_data.actor_ids:
        actor = db.query(models.Actor).filter(models.Actor.id == aid).first()
        if actor:
            movie.actors.append(actor)

    db.commit()
    db.refresh(movie)
    return movie

# DELETE
@router.delete("/{movie_id}")
def delete_movie(movie_id: int, db: Session = Depends(get_db)):
    movie = db.query(models.Movie).filter(models.Movie.id == movie_id).first()
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    db.delete(movie)
    db.commit()
    return {"detail": "Movie deleted successfully"}
