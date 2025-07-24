from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import models, schemas
from app.database import SessionLocal

router = APIRouter(prefix="/directors", tags=["Directors"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.Director)
def create_director(director: schemas.DirectorCreate, db: Session = Depends(get_db)):
    db_director = models.Director(**director.dict())
    db.add(db_director)
    db.commit()
    db.refresh(db_director)
    return db_director

@router.get("/", response_model=List[schemas.Director])
def get_directors(db: Session = Depends(get_db)):
    return db.query(models.Director).all()

@router.get("/{director_id}", response_model=schemas.Director)
def get_director(director_id: int, db: Session = Depends(get_db)):
    director = db.query(models.Director).filter(models.Director.id == director_id).first()
    if not director:
        raise HTTPException(status_code=404, detail="Director not found")
    return director

@router.put("/{director_id}", response_model=schemas.Director)
def update_director(director_id: int, updated_director: schemas.DirectorCreate, db: Session = Depends(get_db)):
    director = db.query(models.Director).filter(models.Director.id == director_id).first()
    if not director:
        raise HTTPException(status_code=404, detail="Director not found")
    for key, value in updated_director.dict().items():
        setattr(director, key, value)
    db.commit()
    db.refresh(director)
    return director

@router.delete("/{director_id}", status_code=204)
def delete_director(director_id: int, db: Session = Depends(get_db)):
    director = db.query(models.Director).filter(models.Director.id == director_id).first()
    if not director:
        raise HTTPException(status_code=404, detail="Director not found")
    db.delete(director)
    db.commit()
    return None
