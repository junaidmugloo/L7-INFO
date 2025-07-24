import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import ActorProfile from "./pages/ActorProfile";
import DirectorProfile from "./pages/DirectorProfile";
import Navbar from "./components/Navbar";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/actors/:id" element={<ActorProfile />} />
        <Route path="/directors/:id" element={<DirectorProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
