from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import models, schemas
from app.database import SessionLocal

router = APIRouter(prefix="/genres", tags=["Genres"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.Genre)
def create_genre(genre: schemas.GenreCreate, db: Session = Depends(get_db)):
    db_genre = models.Genre(name=genre.name)
    db.add(db_genre)
    db.commit()
    db.refresh(db_genre)
    return db_genre

@router.get("/", response_model=List[schemas.Genre])
def get_genres(db: Session = Depends(get_db)):
    return db.query(models.Genre).all()

@router.get("/{genre_id}", response_model=schemas.Genre)
def get_genre(genre_id: int, db: Session = Depends(get_db)):
    genre = db.query(models.Genre).filter(models.Genre.id == genre_id).first()
    if not genre:
        raise HTTPException(status_code=404, detail="Genre not found")
    return genre

@router.put("/{genre_id}", response_model=schemas.Genre)
def update_genre(genre_id: int, updated_genre: schemas.GenreCreate, db: Session = Depends(get_db)):
    genre = db.query(models.Genre).filter(models.Genre.id == genre_id).first()
    if not genre:
        raise HTTPException(status_code=404, detail="Genre not found")
    genre.name = updated_genre.name
    db.commit()
    db.refresh(genre)
    return genre

@router.delete("/{genre_id}", status_code=204)
def delete_genre(genre_id: int, db: Session = Depends(get_db)):
    genre = db.query(models.Genre).filter(models.Genre.id == genre_id).first()
    if not genre:
        raise HTTPException(status_code=404, detail="Genre not found")
    db.delete(genre)
    db.commit()
    return None  # or use `Response(status_code=204)` if you import `Response` from `fastapi`
