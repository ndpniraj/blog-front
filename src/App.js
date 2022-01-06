import React, { useState } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { Route, Routes } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import PostDetail from "./components/PostDetail";
import SearchForm from "./components/SearchForm";
import SearchResults from "./components/SearchResults";
import UpdatePost from "./components/UpdatePost";

export default function App() {
  const [closedNav, setClosedNav] = useState(false);
  const toggleNav = () => {
    console.log("clicked");
    setClosedNav(!closedNav);
  };

  const getNavWidth = () => (closedNav ? "w-16" : "w-56");
  return (
    <div className="flex">
      <nav
        className={getNavWidth() + " min-h-screen border-r transition-width"}
      >
        <div className="sticky top-0">
          <Navbar closed={closedNav} />
        </div>
      </nav>
      <div className="flex-1 bg-gray-100">
        <div className="sticky top-0">
          <div className="flex items-center">
            <button
              onClick={toggleNav}
              className="text-right p-2 text-gray-700"
            >
              {closedNav ? (
                <AiOutlineMenuUnfold size={25} />
              ) : (
                <AiOutlineMenuFold size={25} />
              )}
            </button>
            <SearchForm />
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:slug" element={<UpdatePost />} />
          <Route path="/blog/:slug" element={<PostDetail />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
