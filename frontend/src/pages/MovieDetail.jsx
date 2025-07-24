import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [allGenres, setAllGenres] = useState([]);
  const [allActors, setAllActors] = useState([]);
  const [allDirectors, setAllDirectors] = useState([]);

  useEffect(() => {
    // Fetch movie details
    api.get(`/movies/${id}`).then((res) => setMovie(res.data));

    // Fetch all lookup data
    api.get("/genres/").then((res) => setAllGenres(res.data));
    api.get("/actors/").then((res) => setAllActors(res.data));
    api.get("/directors/").then((res) => setAllDirectors(res.data));
  }, [id]);

  if (!movie) return <p className="p-6 text-center text-lg">Loading...</p>;

  // Resolve names
  const genres = movie.genre_ids?.map(
    (gid) => allGenres.find((g) => g.id === gid)?.name || "Unknown"
  ) || [];

  const actors = movie.actor_ids?.map(
    (aid) => allActors.find((a) => a.id === aid)
  ) || [];

  const director = allDirectors.find((d) => d.id === movie.director_id);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
      <h1 className="text-4xl font-bold mb-2 text-gray-800">{movie.title}</h1>
      <p className="text-gray-600 text-lg mb-1">Released: {movie.release_year}</p>
      <p className="text-gray-600 text-lg mb-4">Rating: {movie.rating || "N/A"}</p>

      <p className="text-gray-700 mb-4">
        Director:{" "}
        {director ? (
          <Link
            to={`/directors/${director.id}`}
            className="text-blue-600 hover:underline"
          >
            {director.name}
          </Link>
        ) : (
          "Unknown"
        )}
      </p>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Genres:</h3>
        <div className="flex flex-wrap gap-2">
          {genres.map((name, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Actors:</h3>
        <div className="flex flex-wrap gap-2">
          {actors.map((actor) =>
            actor ? (
              <Link
                key={actor.id}
                to={`/actors/${actor.id}`}
                className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm hover:bg-emerald-200 transition"
              >
                {actor.name}
              </Link>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
