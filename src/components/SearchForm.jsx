import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchProvider";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const { handleSearch, searchResults, resetSearch } = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSearch(query);
    navigate("/");
  };

  const handleReset = () => {
    setQuery("");
    resetSearch();
  };

  const handleKeyDown = ({ key }) => {
    if (key === "Escape") {
      handleReset();
    }
  };

  return (
    <form
      onKeyDown={handleKeyDown}
      onSubmit={handleSubmit}
      className="relative"
    >
      <input
        value={query}
        onChange={({ target }) => setQuery(target.value)}
        type="text"
        className="border border-gray-400 w-56 rounded p-1 outline-none focus:ring-1 ring-blue-500"
        placeholder="Search..."
      />
      {searchResults.length ? (
        <button
          onClick={handleReset}
          type="button"
          className="absolute right-3 text-gray-700 top-1/2 -translate-y-1/2"
        >
          <AiOutlineClose />
        </button>
      ) : null}
    </form>
  );
}
