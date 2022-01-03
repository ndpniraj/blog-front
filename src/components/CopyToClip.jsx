import React from "react";
import { ImFilesEmpty } from "react-icons/im";

export default function CopyToClip({ value, valueToCopy, onCopied }) {
  const copyText = () => {
    navigator.clipboard.writeText(valueToCopy);
    onCopied();
  };

  return (
    <div className="flex-grow self-stretch flex items-center space-x-2 mx-2 bg-gray-500 text-white rounded overflow-hidden">
      <input
        className="flex-grow self-stretch bg-transparent px-2"
        type="text"
        value={value}
        disabled
      />

      <button
        onClick={copyText}
        className="self-stretch flex flex-col justify-center items-center bg-primary text-xs px-2"
        type="button"
      >
        <ImFilesEmpty /> copy
      </button>
    </div>
  );
}
