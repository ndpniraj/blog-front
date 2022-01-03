import React from "react";

export default function PostTitleInput({ value, name, onChange, ...rest }) {
  return (
    <input
      onChange={onChange}
      value={value}
      name={name}
      type="text"
      className="focus:ring-1 ring-blue-500 transition w-full resize-none border rounded-md outline-none p-2 font-semibold text-xl"
      placeholder="Post title"
      {...rest}
    />
  );
}
