from typing import List
from pydantic import BaseModel, Field, validator
from datetime import datetime

CURRENT_YEAR = datetime.now().year

# ------------------- GENRE -------------------
class GenreBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=50, description="Genre name is required.")

class GenreCreate(GenreBase):
    pass

class Genre(GenreBase):
    id: int
    class Config:
        orm_mode = True

# ------------------- ACTOR -------------------
class ActorBase(BaseModel):
    name: str = Field(..., min_length=2, description="Actor name is required.")
    bio: str = Field(..., min_length=5, max_length=500, description="Actor bio is required.")
    dob: str = Field(..., description="Date of birth in YYYY-MM-DD format is required.")

class ActorCreate(ActorBase):
    pass

class Actor(ActorBase):
    id: int
    class Config:
        orm_mode = True

# ------------------- DIRECTOR -------------------
class DirectorBase(BaseModel):
    name: str = Field(..., min_length=2, description="Director name is required.")
    bio: str = Field(..., min_length=5, max_length=500, description="Director bio is required.")
    dob: str = Field(..., description="Date of birth in YYYY-MM-DD format is required.")

class DirectorCreate(DirectorBase):
    pass

class Director(DirectorBase):
    id: int
    class Config:
        orm_mode = True

# ------------------- MOVIE -------------------
class MovieBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=100, description="Movie title is required.")
    release_year: int = Field(..., ge=1888, le=CURRENT_YEAR + 1, description="Valid release year is required.")
    rating: float = Field(..., ge=0.0, le=10.0, description="Rating must be between 0 and 10.")
    director_id: int = Field(..., ge=1, description="Valid director ID is required.")

class MovieCreate(MovieBase):
    genre_ids: List[int] = Field(..., min_items=1, description="At least one genre is required.")
    actor_ids: List[int] = Field(..., min_items=1, description="At least one actor is required.")

    @validator("genre_ids", "actor_ids", each_item=True)
    def check_positive_ids(cls, v):
        if v <= 0:
            raise ValueError("Each ID must be a positive integer.")
        return v

class Movie(MovieBase):
    id: int
    genre_ids: List[int]
    actor_ids: List[int]

    class Config:
        orm_mode = True
