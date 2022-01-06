import React from "react";
import { useSearch } from "../context/SearchProvider";
import PostCard from "./PostCard";

export default function SearchResults() {
  const { searchResults } = useSearch();

  return (
    <div className="p-2 max-w-screen-lg mx-auto">
      <div className="pb-20 transition-height">
        <div className="md:grid grid-cols-2 lg:grid-cols-3 gap-3">
          {searchResults.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
