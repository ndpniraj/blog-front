import React from "react";
import { ImFilePicture, ImSpinner3 } from "react-icons/im";

export default function ImageUploadButton({ busy, onChange }) {
  return (
    <div>
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/gif"
        id="image-input"
        onChange={onChange}
        hidden
      />
      <label
        htmlFor="image-input"
        className="flex justify-between items-center border border-gray-400 border-primary text-primary hover:bg-hilight hover:ring-1 ring-blue-500 transition p-2 cursor-pointer rounded"
      >
        Place Image
        {busy ? (
          <ImSpinner3 className="ml-2 animate-spin" />
        ) : (
          <ImFilePicture className="ml-2" />
        )}
      </label>
    </div>
  );
}
