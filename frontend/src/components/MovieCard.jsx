import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{movie.title}</h2>
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
        className="mt-4 text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
      >
        View Details
      </Link>
    </div>
  );
};

export default MovieCard;
