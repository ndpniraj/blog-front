import React, { useEffect, useState } from "react";
import { deletePost, getPosts } from "../api/post";
import { useNotification } from "../context/NotificationProvider";
import { useSearch } from "../context/SearchProvider";

import PostCard from "./PostCard";

const posts = [
  {
    title: "This is the title one",
    meta: "This is the meta time this effect cleanup function runs. If this ref points to a node rendered",
    createdAt: "2021-12-02",
    thumbnail:
      "https://images.unsplash.com/photo-1640791317288-e02d0cdcd7fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    id: "123",
  },
  {
    title: "This is the title one",
    meta: "This is the meta time this effect cleanup function runs. If this ref points to a node rendered",
    createdAt: "2021-12-02",
    thumbnail:
      "https://images.unsplash.com/photo-1640791317288-e02d0cdcd7fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    id: "1234",
  },
  {
    title: "This is the title one",
    meta: "This is the meta time this effect cleanup function runs. If this ref points to a node rendered",
    createdAt: "2021-12-02",
    thumbnail:
      "https://images.unsplash.com/photo-1640791317288-e02d0cdcd7fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    id: "1235",
  },
  {
    title: "This is the title one",
    meta: "This is the meta time this effect cleanup function runs. If this ref points to a node rendered",
    createdAt: "2021-12-02",
    thumbnail:
      "https://images.unsplash.com/photo-1640791317288-e02d0cdcd7fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    id: "1231",
  },
  {
    title: "This is the title one",
    meta: "This is the meta time this effect cleanup function runs. If this ref points to a node rendered",
    createdAt: "2021-12-02",
    thumbnail:
      "https://images.unsplash.com/photo-1640791317288-e02d0cdcd7fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    id: "1238",
  },
  {
    title: "This is the title one",
    meta: "This is the meta time this effect cleanup function runs. If this ref points to a node rendered",
    createdAt: "2021-12-02",
    thumbnail:
      "https://images.unsplash.com/photo-1640791317288-e02d0cdcd7fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    id: "1230",
  },
  {
    title: "This is the title one",
    meta: "This is the meta time this effect cleanup function runs. If this ref points to a node rendered",
    createdAt: "2021-12-02",
    thumbnail:
      "https://images.unsplash.com/photo-1640791317288-e02d0cdcd7fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    id: "12345",
  },
  {
    title: "This is the title one",
    meta: "This is the meta time this effect cleanup function runs. If this ref points to a node rendered",
    createdAt: "2021-12-02",
    thumbnail:
      "https://images.unsplash.com/photo-1640791317288-e02d0cdcd7fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    id: "12354",
  },
];

let pageNo = 0;
const perPage = 9;
const getPaginationCount = (length) => {
  const division = length / perPage;
  if (division % 1 !== 0) {
    return Math.floor(length / perPage) + 1;
  }
  return division;
};

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [totalPostCount, setTotlaPostCount] = useState(0);
  const { searchResults } = useSearch();

  const { updateNotification } = useNotification();

  const paginationCount = getPaginationCount(totalPostCount);
  const paginations = new Array(paginationCount).fill(" ");

  const fetchPosts = async () => {
    const { error, posts, postCount } = await getPosts(pageNo, 9);
    if (error) return updateNotification("error", error);
    setPosts(posts);
    setTotlaPostCount(postCount);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure, you want to remove this post!"
    );
    if (!confirmDelete) return;
    const { error, message } = await deletePost(id);
    if (error) updateNotification("error", error);

    updateNotification("success", message);
    setPosts(posts.filter((p) => p.id !== id));
  };

  const fetchMorePost = (index) => {
    pageNo = index;
    fetchPosts();
  };

  if (!posts.length)
    return (
      <h1 className="font-semibold p-5 text-center text-3xl text-gray-500">
        No posts to display
      </h1>
    );

  return (
    <div className="p-2 max-w-screen-lg mx-auto">
      <div className="pb-20 transition-height">
        <div className="md:grid grid-cols-2 lg:grid-cols-3 gap-3">
          {searchResults.length
            ? searchResults.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onDeleteClick={handleDelete}
                />
              ))
            : posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onDeleteClick={handleDelete}
                />
              ))}
        </div>

        <div className="flex items-center justify-center mt-5 space-x-2">
          {paginations.map((_, index) => (
            <button
              onClick={() => fetchMorePost(index)}
              className={
                (pageNo === index
                  ? "text-blue-500 border-b border-blue-500"
                  : "text-gray-500") + " p-1"
              }
              key={index.toString()}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
