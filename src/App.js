import React from "react";
import { Route, Routes } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import PostDetail from "./components/PostDetail";
import PostForm from "./components/PostForm";
import UpdatePost from "./components/UpdatePost";

export default function App() {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:slug" element={<UpdatePost />} />
          <Route path="/blog/:slug" element={<PostDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
