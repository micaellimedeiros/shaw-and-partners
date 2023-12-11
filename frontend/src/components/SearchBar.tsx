import React, { ChangeEvent, useState, useCallback } from "react";

import api from "../services/api";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const fetchSearchResults = useCallback(async () => {
    if (!searchQuery) return;

    try {
      setError(null);
      setLoading(true);

      const response = await api.get("/api/users", {
        params: { q: searchQuery },
      });

      onSearch(response.data.data);
    } catch (error: any) {
      setError(`Error searching. "${error.message}"`);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, onSearch]);

  return (
    <div>
      <label htmlFor="search">Search:</label>
      <input
        type="text"
        id="search"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search..."
        disabled={loading}
      />

      <button onClick={() => fetchSearchResults()} disabled={loading}>
        Search
      </button>

      {loading && <p>Searching...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SearchBar;
