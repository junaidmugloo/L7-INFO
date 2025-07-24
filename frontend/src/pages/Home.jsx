import { useEffect, useState } from "react";
import api from "../api/api";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [directors, setDirectors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [moviesRes, directorsRes, genresRes, actorsRes] = await Promise.all([
        api.get("/movies"),
        api.get("/directors"),
        api.get("/genres"),
        api.get("/actors"),
      ]);

      const directorsMap = Object.fromEntries(directorsRes.data.map(d => [d.id, d]));
      const genresMap = Object.fromEntries(genresRes.data.map(g => [g.id, g]));
      const actorsMap = Object.fromEntries(actorsRes.data.map(a => [a.id, a]));

      const enrichedMovies = moviesRes.data.map((movie) => ({
        ...movie,
        director: directorsMap[movie.director_id] || null,
        genres: movie.genre_ids.map((id) => genresMap[id]).filter(Boolean),
        actors: movie.actor_ids.map((id) => actorsMap[id]).filter(Boolean),
      }));

      setMovies(enrichedMovies);
      setFiltered(enrichedMovies);
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();

    const result = movies.filter((movie) => {
      const inTitle = movie.title.toLowerCase().includes(lowerQuery);
      const inDirector = movie.director?.name.toLowerCase().includes(lowerQuery);
      const inGenres = movie.genres?.some(g => g.name.toLowerCase().includes(lowerQuery));
      const inActors = movie.actors?.some(a => a.name.toLowerCase().includes(lowerQuery));

      return inTitle || inDirector || inGenres || inActors;
    });

    setFiltered(result);
  };

  return (
    <div className="p-4">
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
