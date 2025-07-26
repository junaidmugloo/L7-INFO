import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">🎬 Movie Explorer</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/fav">Favorite</Link>
      </div>
    </nav>
  );
};

export default Navbar;
