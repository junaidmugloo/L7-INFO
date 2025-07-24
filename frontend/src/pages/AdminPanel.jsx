import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = axios.create({ baseURL: "http://localhost:8000" });

const tabStyle = "px-4 py-2 text-lg font-semibold cursor-pointer";
const activeTabStyle = "border-b-4 border-blue-600 text-blue-600";

const AdminPanel = () => {
  const [tab, setTab] = useState("movie");
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [movies, setMovies] = useState([]);
  const [actorsList, setActorsList] = useState([]);
  const [directorsList, setDirectorsList] = useState([]);
  const [genresList, setGenresList] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const fetchData = async () => {
    try {
      const [g, a, d, m] = await Promise.all([
        API.get("/genres"),
        API.get("/actors"),
        API.get("/directors"),
        API.get("/movies"),
      ]);
      setGenres(g.data);
      setGenresList(g.data);
      setActors(a.data);
      setActorsList(a.data);
      setDirectors(d.data);
      setDirectorsList(d.data);
      setMovies(m.data);
    } catch {
      toast.error("Failed to load data");
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchData();
  }, [isLoggedIn]);

  const movieFormik = useFormik({
    initialValues: {
      title: "",
      release_year: "",
      rating: "",
      genre_ids: [],
      actor_ids: [],
      director_id: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await API.post("/movies", {
          ...values,
          genre_ids: values.genre_ids.map((g) => g.value),
          actor_ids: values.actor_ids.map((a) => a.value),
          director_id: values.director_id.value,
        });
        toast.success("Movie added!");
        resetForm();
        fetchData();
      } catch {
        toast.error("Failed to add movie");
      }
    },
  });

  const actorDirectorFormik = useFormik({
    initialValues: { name: "", bio: "", dob: "" },
    onSubmit: async (values, { resetForm }) => {
      try {
        const path = tab === "actor" ? "/actors" : "/directors";
        await API.post(path, values);
        toast.success(`${tab === "actor" ? "Actor" : "Director"} added!`);
        resetForm();
        fetchData();
      } catch {
        toast.error(`Failed to add ${tab}`);
      }
    },
  });

  const genreFormik = useFormik({
    initialValues: { name: "" },
    onSubmit: async (values, { resetForm }) => {
      try {
        await API.post("/genres", values);
        toast.success("Genre added!");
        resetForm();
        fetchData();
      } catch {
        toast.error("Failed to add genre");
      }
    },
  });

  const deleteItem = async (id, type) => {
    try {
      await API.delete(`/${type}/${id}`);
      toast.success("Deleted successfully");
      fetchData();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const renderMovieForm = () => (
    <form onSubmit={movieFormik.handleSubmit} className="space-y-4">
      <input type="text" name="title" placeholder="Title" onChange={movieFormik.handleChange} value={movieFormik.values.title} className="w-full p-2 border rounded" />
      <input type="number" name="release_year" placeholder="Release Year" onChange={movieFormik.handleChange} value={movieFormik.values.release_year} className="w-full p-2 border rounded" />
      <input type="number" name="rating" placeholder="Rating (0-19)" min="0" max="19" onChange={movieFormik.handleChange} value={movieFormik.values.rating} className="w-full p-2 border rounded" />
      <Select isMulti name="genre_ids" options={genres.map((g) => ({ value: g.id, label: g.name }))} onChange={(val) => movieFormik.setFieldValue("genre_ids", val)} value={movieFormik.values.genre_ids} placeholder="Select Genres" />
      <Select isMulti name="actor_ids" options={actors.map((a) => ({ value: a.id, label: a.name }))} onChange={(val) => movieFormik.setFieldValue("actor_ids", val)} value={movieFormik.values.actor_ids} placeholder="Select Actors" />
      <Select name="director_id" options={directors.map((d) => ({ value: d.id, label: d.name }))} onChange={(val) => movieFormik.setFieldValue("director_id", val)} value={movieFormik.values.director_id} placeholder="Select Director" />
      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Add Movie</button>
    </form>
  );

  const renderActorDirectorForm = () => (
    <form onSubmit={actorDirectorFormik.handleSubmit} className="space-y-4">
      <input type="text" name="name" placeholder="Name" onChange={actorDirectorFormik.handleChange} value={actorDirectorFormik.values.name} className="w-full p-2 border rounded" />
      <input type="text" name="bio" placeholder="Bio" onChange={actorDirectorFormik.handleChange} value={actorDirectorFormik.values.bio} className="w-full p-2 border rounded" />
      <input type="date" name="dob" placeholder="DOB" onChange={actorDirectorFormik.handleChange} value={actorDirectorFormik.values.dob} className="w-full p-2 border rounded" />
      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Add {tab === "actor" ? "Actor" : "Director"}</button>
    </form>
  );

  const renderGenreForm = () => (
    <form onSubmit={genreFormik.handleSubmit} className="space-y-4">
      <input type="text" name="name" placeholder="Genre Name" onChange={genreFormik.handleChange} value={genreFormik.values.name} className="w-full p-2 border rounded" />
      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Add Genre</button>
    </form>
  );

  const renderTable = (data, type) => (
    <table className="w-full mt-8 table-auto border border-gray-300 rounded">
      <thead className="bg-gray-100">
        <tr>
          {type === "movie" && (<><th className="p-2 border">Title</th><th className="p-2 border">Year</th><th className="p-2 border">Director</th><th className="p-2 border">Actions</th></>)}
          {(type === "actor" || type === "director") && (<><th className="p-2 border">Name</th><th className="p-2 border">DOB</th><th className="p-2 border">Actions</th></>)}
          {type === "genre" && (<><th className="p-2 border">Name</th><th className="p-2 border">Actions</th></>)}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="text-center">
            {type === "movie" && (<><td className="p-2 border">{item.title}</td><td className="p-2 border">{item.release_year}</td><td className="p-2 border">{directorsList.find((d) => d.id === item.director_id)?.name || "N/A"}</td></>)}
            {(type === "actor" || type === "director") && (<><td className="p-2 border">{item.name}</td><td className="p-2 border">{item.dob}</td></>)}
            {type === "genre" && (<td className="p-2 border">{item.name}</td>)}
            <td className="p-2 border">
              <button onClick={() => deleteItem(item.id, `${type}s`)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="relative">
      <ToastContainer />
      
      {!isLoggedIn && (
        <div className="absolute inset-0 z-50 bg-white bg-opacity-95 flex flex-col items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 mb-3 border rounded" />
            <small>username is admin</small>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-3 border rounded" />
           <small>password is admin</small>
            <button onClick={() => {
              if (username === "admin" && password === "admin") {
                setIsLoggedIn(true);
              } else {
                toast.error("Invalid credentials");
              }
            }} className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Login
            </button>
          </div>
        </div>
      )}

      <div className={`min-h-screen bg-gray-100 p-6 transition-all duration-300 ${!isLoggedIn ? "blur-sm pointer-events-none" : ""}`}>
        <h1 className="text-3xl font-bold text-center mb-6">Admin Panel</h1>
        <div className="flex justify-center gap-6 mb-6 border-b">
          {["movie", "actor", "director", "genre"].map((t) => (
            <div key={t} onClick={() => setTab(t)} className={`${tab === t ? activeTabStyle : ""} ${tabStyle}`}>
              {`Add ${t.charAt(0).toUpperCase() + t.slice(1)}`}
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
          {tab === "movie" && renderMovieForm()}
          {(tab === "actor" || tab === "director") && renderActorDirectorForm()}
          {tab === "genre" && renderGenreForm()}
          {tab === "movie" && renderTable(movies, "movie")}
          {tab === "actor" && renderTable(actorsList, "actor")}
          {tab === "director" && renderTable(directorsList, "director")}
          {tab === "genre" && renderTable(genresList, "genre")}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
