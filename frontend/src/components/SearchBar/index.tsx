import { ChangeEvent, useState } from "react";

import { useAppContext } from "../../context/AppContext";

import {
  SearchContainer,
  SearchLabel,
  SearchInput,
  SearchButton,
} from "./styles";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { loading, search } = useAppContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    await search(searchQuery);
  };

  return (
    <SearchContainer>
      <SearchLabel htmlFor="search">Filter:</SearchLabel>
      <SearchInput
        type="text"
        id="search"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Type to filter..."
        disabled={loading}
      />

      <SearchButton onClick={() => handleSearch()} disabled={loading}>
        Search
      </SearchButton>
    </SearchContainer>
  );
};

export default SearchBar;
