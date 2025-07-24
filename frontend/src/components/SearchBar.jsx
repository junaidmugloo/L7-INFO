import { useState, useEffect } from "react";
import { Search } from "lucide-react"; // optional: for search icon

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  // Live search as user types
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(query);
    }, 300); // debounce delay

    return () => clearTimeout(delayDebounce);
  }, [query, onSearch]);

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-6">
      <div className="flex items-center gap-2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, genre, actor..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
        <button
          onClick={() => onSearch(query)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
