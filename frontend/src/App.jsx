import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const MovieDetail = lazy(() => import("./pages/MovieDetail"));
const ActorProfile = lazy(() => import("./pages/ActorProfile"));
const DirectorProfile = lazy(() => import("./pages/DirectorProfile"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const Playground = lazy(() => import("./pages/Playground"));
const Fav = lazy(() => import("./pages/Fav"));

function App() {
  return (
    <Router>
      <Navbar />

      <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
        <Routes>
          <Route path="/playground" element={<Playground />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/actors/:id" element={<ActorProfile />} />
          <Route path="/directors/:id" element={<DirectorProfile />} />
          <Route path="/fav" element={<Fav />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
