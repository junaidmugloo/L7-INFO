import { Link } from "react-router-dom";
import { useState } from "react";
import { LucideHeart, LucideHeartOff, LucideScanHeart } from "lucide-react";

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(checkIfFavorite(movie.id));

  // Check if the movie is already in favorites
  function checkIfFavorite(id) {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    return favs.some((m) => m.id === id);
  }

  // Handle Add/Remove Favorite
  const handleFavoriteClick = () => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];

    let updatedFavs;

    if (isFavorite) {
      // Remove from favorites
      updatedFavs = favs.filter((m) => m.id !== movie.id);
    } else {
      // Add to favorites
      updatedFavs = [...favs, movie];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavs));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xxl transition duration-300 p-6 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{movie.title}</h2>
          <button onClick={handleFavoriteClick} style={{ cursor: "pointer", fontSize: "20px" }}>
            {isFavorite ? <LucideHeart style={{ fill: "black" }}/> :<LucideHeart/>  }
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-2">Released: {movie.release_year}</p>

        {/* Rating */}
        <div className="text-sm text-yellow-800 bg-yellow-100 rounded-full px-3 py-1 inline-block mb-3">
          Rating: {movie.rating}
        </div>

        {/* Director */}
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold">Director:</span>{" "}
          {movie.director?.name || "Unknown"}
        </p>

        {/* Genres */}
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold">Genres:</span>{" "}
          {movie.genres?.map(g => g.name).join(", ") || "None"}
        </p>

        {/* Actors */}
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Actors:</span>{" "}
          {movie.actors?.map(a => a.name).join(", ") || "None"}
        </p>
      </div>

      <Link
        to={`/movies/${movie.id}`}
        className="mt-4 text-center bg-blue-600 hover:bg-blue-300 text-white px-4 py-2 rounded-lg text-sm font-semibold"
      >
        View Details
      </Link>
    </div>
  );
};

export default MovieCard;
