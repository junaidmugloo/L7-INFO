import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard"; // adjust path if needed

export default function Fav() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  const loadFavorites = () => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favs);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  // Handle toggle (remove) from favorites
  const handleToggleFavorite = (movieId) => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    const updated = favs.filter((m) => m.id !== movieId);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated); // update DOM
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Your Favorite Movies 💖</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">No favorite movies yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onToggleFavorite={handleToggleFavorite} // pass callback
              isFavPage={true} // let card know it's being shown in favorites
            />
          ))}
        </div>
      )}
    </div>
  );
}
