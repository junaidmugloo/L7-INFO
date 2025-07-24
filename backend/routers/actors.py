from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app import models, schemas
from app.database import SessionLocal

router = APIRouter(prefix="/actors", tags=["Actors"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Create Actor
@router.post("/", response_model=schemas.Actor)
def create_actor(actor: schemas.ActorCreate, db: Session = Depends(get_db)):
    db_actor = models.Actor(**actor.dict())
    db.add(db_actor)
    db.commit()
    db.refresh(db_actor)
    return db_actor


# Read All Actors
@router.get("/", response_model=List[schemas.Actor])
def get_actors(db: Session = Depends(get_db)):
    return db.query(models.Actor).all()


# Read One Actor by ID
@router.get("/{actor_id}", response_model=schemas.Actor)
def get_actor(actor_id: int, db: Session = Depends(get_db)):
    actor = db.query(models.Actor).filter(models.Actor.id == actor_id).first()
    if not actor:
        raise HTTPException(status_code=404, detail="Actor not found")
    return actor


# Update Actor
@router.put("/{actor_id}", response_model=schemas.Actor)
def update_actor(actor_id: int, updated_actor: schemas.ActorCreate, db: Session = Depends(get_db)):
    actor = db.query(models.Actor).filter(models.Actor.id == actor_id).first()
    if not actor:
        raise HTTPException(status_code=404, detail="Actor not found")
    for key, value in updated_actor.dict().items():
        setattr(actor, key, value)
    db.commit()
    db.refresh(actor)
    return actor


# Delete Actor
@router.delete("/{actor_id}")
def delete_actor(actor_id: int, db: Session = Depends(get_db)):
    actor = db.query(models.Actor).filter(models.Actor.id == actor_id).first()
    if not actor:
        raise HTTPException(status_code=404, detail="Actor not found")
    db.delete(actor)
    db.commit()
    return {"detail": "Actor deleted successfully"}
