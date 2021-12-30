import React from "react";
import dateFormat from "dateformat";

export default function PostCard({ post }) {
  if (!post) return null;
  const { title, meta, thumbnail, createdAt } = post;

  return (
    <div className="rounded overflow-hidden shadow-md">
      <img className="aspect-video" src={thumbnail} alt={title} />
      <div className="p-3">
        <h1 className="font-semibold text-lg text-gray-700">{title}</h1>
        <p className="text-gray-500">{meta.substring(0, 80) + "..."}</p>
        <div className="flex justify-between items-center pt-2">
          <p className="text-xs text-gray-500">
            {dateFormat(createdAt, "mediumDate")}
          </p>
          <p className="text-xs text-gray-500">React Native</p>
        </div>
      </div>
      <div className="flex justify-between items-center pt-2">
        <button className="text-center w-full py-2 bg-red-500 text-white hover:bg-red-600 transition">
          Delete
        </button>
        <button className="text-center w-full py-2 bg-blue-500 text-white hover:bg-blue-600 transition">
          Edit
        </button>
      </div>
    </div>
  );
}
