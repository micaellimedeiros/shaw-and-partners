import { ChangeEvent, useState } from "react";
import { useAppContext } from "../context/AppContext";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { loading, search, error } = useAppContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    await search(searchQuery);
  };

  return (
    <div>
      <label htmlFor="search">Filter:</label>
      <input
        type="text"
        id="search"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Type to filter..."
        disabled={loading}
      />

      <button onClick={() => handleSearch()} disabled={loading}>
        Search
      </button>

      {loading && <p>Searching...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SearchBar;
