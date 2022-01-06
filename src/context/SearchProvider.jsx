import React, { createContext, useContext, useState } from "react";
import { searchPost } from "../api/post";
import { useNotification } from "./NotificationProvider";

const SearchContext = createContext();

let timeoutId;

export default function SearchProvider({ children }) {
  const { updateNotification } = useNotification();
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    if (!query.trim()) return;

    const { error, posts } = await searchPost(query);
    if (error) return updateNotification("error", error);

    setSearchResults(posts);
  };

  const resetSearch = () => {
    setSearchResults([]);
  };

  return (
    <SearchContext.Provider
      value={{ searchResults, handleSearch, resetSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
