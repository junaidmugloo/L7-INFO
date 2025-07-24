from sqlalchemy import Column, Integer, String, Float, ForeignKey, Table
from sqlalchemy.orm import relationship
from .database import Base

# Join tables
movie_actor = Table('movie_actor', Base.metadata,
    Column('movie_id', ForeignKey('movies.id'), primary_key=True),
    Column('actor_id', ForeignKey('actors.id'), primary_key=True)
)

movie_genre = Table('movie_genre', Base.metadata,
    Column('movie_id', ForeignKey('movies.id'), primary_key=True),
    Column('genre_id', ForeignKey('genres.id'), primary_key=True)
)

class Movie(Base):
    __tablename__ = 'movies'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    release_year = Column(Integer)
    rating = Column(Float)
    director_id = Column(Integer, ForeignKey("directors.id"))

    director = relationship("Director", back_populates="movies")
    genres = relationship("Genre", secondary=movie_genre, back_populates="movies")
    actors = relationship("Actor", secondary=movie_actor, back_populates="movies")
    @property
    def genre_ids(self):
        return [genre.id for genre in self.genres]

    @property
    def actor_ids(self):
        return [actor.id for actor in self.actors]
    
class Director(Base):
    __tablename__ = 'directors'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    bio = Column(String)
    dob = Column(String)

    movies = relationship("Movie", back_populates="director")

class Actor(Base):
    __tablename__ = 'actors'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    bio = Column(String)
    dob = Column(String)

    movies = relationship("Movie", secondary=movie_actor, back_populates="actors")

class Genre(Base):
    __tablename__ = 'genres'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)

    movies = relationship("Movie", secondary=movie_genre, back_populates="genres")
