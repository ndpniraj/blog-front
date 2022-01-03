import React from "react";
import Markdown from "markdown-to-jsx";

export default function DeviceView({
  visible,
  title,
  content,
  thumbnail,
  onClose,
}) {
  if (!visible) return null;

  const handleClose = ({ target }) => {
    if (target.id === "container") onClose();
  };

  return (
    <div
      id="container"
      onClick={handleClose}
      className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
    >
      <div className="w-device-width h-device-height bg-white rounded overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        <img src={thumbnail} alt="" />
        <div className="px-2">
          <h1 className="text-gray-800 font-semibold text-xl py-2">{title}</h1>
          <div className="prose prose-sm prose-headings:my-2">
            <Markdown>{content}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}
