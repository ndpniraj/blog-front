import React from "react";

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

export default function Home() {
  return (
    <div className="p-2 pb-20 max-w-screen-xl mx-auto grid grid-cols-4 gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
