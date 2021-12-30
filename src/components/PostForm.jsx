import { ImEye, ImFilePicture, ImSpinner3 } from "react-icons/im";
import { useState } from "react";
import { useError } from "../context/ErrorProvider";
import MarkdownHint from "./MarkdownHint";
import DeviceView from "./DeviceView";

function PostForm() {
  const [imageUploading, seImageUploading] = useState(false);
  const [showMarkdownHint, setShowMarkdownHint] = useState(false);
  const [post, setPost] = useState({ title: "", content: "", thumbnail: "" });
  const [selectedThumbURL, setSelectedThumbURL] = useState("");
  const [viewPost, setViewPost] = useState(false);

  const { updateError } = useError();

  const uploadImage = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("error happinigg");
      }, 3000);
    });

  const handleImageUpoad = async ({ target }) => {
    if (imageUploading) return;
    // seImageUploading(true);
    const imageFile = target.files[0];
    if (!imageFile) return;

    if (!imageFile.type.includes("image"))
      return updateError("error", "Invalid image file!");

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await uploadImage(formData);
      seImageUploading(false);
    } catch (error) {
      // seImageUploading(false);
      return updateError("error", error.message || error);
    }

    // if (res.error) return alert(res.error);
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;

    // if the changed property is file then updating the ui (displaying selected image).
    if (name === "thumbnail") {
      const file = target.files[0];
      setPost({ ...post, thumbnail: file });
      return setSelectedThumbURL(URL.createObjectURL(file));
    }

    setPost({ ...post, [name]: value });
  };

  const { title, content } = post;

  return (
    <>
      <div className="max-w-screen-xl lg:h-auto h-screen mx-auto flex lg:flex-row flex-col">
        <div className="lg:w-9/12 lg:h-screen flex-1 flex flex-col justify-between p-2">
          <form className="w-full mt-5 space-y-5 flex-1 flex flex-col">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-xl">Create New Post</h1>
              <div className="flex items-center space-x-5">
                <button
                  type="button"
                  value="Post"
                  className="flex justify-center space-x-2 items-center text-blue-500 px-5 py-2 cursor-pointer rounded hover:bg-blue-500 hover:text-white ring-1 ring-blue-500 transition"
                  onClick={() => setViewPost(true)}
                >
                  <ImEye />
                  <span>View</span>
                </button>
                <input
                  type="submit"
                  value="Post"
                  className="bg-blue-500 text-white w-36 py-2 cursor-pointer rounded hover:bg-transparent hover:text-blue-500 hover:ring-1 border-blue-500 transition"
                />
              </div>
            </div>
            <input
              onChange={handleChange}
              value={title}
              name="title"
              type="text"
              className="focus:ring-1 ring-blue-500 transition w-full resize-none border rounded-md outline-none p-2 font-semibold text-xl"
              placeholder="Post title"
              onFocus={() => setShowMarkdownHint(false)}
            />
            <div className="flex items-center">
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/gif"
                id="image-input"
                className="hidden"
                onChange={handleImageUpoad}
              />
              <label
                htmlFor="image-input"
                className="flex justify-between items-center border border-primary text-primary hover:bg-hilight hover:ring-1 ring-blue-500 transition p-2 cursor-pointer rounded"
              >
                Place Image
                {imageUploading ? (
                  <ImSpinner3 className="ml-2 animate-spin" />
                ) : (
                  <ImFilePicture className="ml-2" />
                )}
              </label>
            </div>
            <textarea
              onChange={handleChange}
              value={content}
              name="content"
              onFocus={() => setShowMarkdownHint(true)}
              placeholder="You can write your here..."
              className="focus:ring-1 ring-blue-500 transition w-full resize-none border rounded-md outline-none p-2 text-lg flex-1 tracking-wide font-mono text-gray-700"
            ></textarea>
          </form>
        </div>
        <div className="lg:w-1/4 p-2 relative">
          <h1 className="text-xl text-gray-500 font-semibold mb-2">
            Thumbnail
          </h1>
          <div className="w-60">
            <input
              onChange={handleChange}
              name="thumbnail"
              id="thumbnail"
              type="file"
              hidden
            />
            <label htmlFor="thumbnail" className="cursor-pointer">
              {selectedThumbURL ? (
                <img
                  className="aspect-video rounded"
                  src={selectedThumbURL}
                  alt=""
                />
              ) : (
                <div className="aspect-video border border-dashed rounded flex flex-col justify-center items-center text-gray-500 text-center">
                  Select Thumbnail
                  <span className="block text-xs">
                    Recommended size <br /> 1280 * 720
                  </span>
                </div>
              )}
            </label>
          </div>
          <div className="lg:absolute top-1/2 lg:-translate-y-1/2">
            {showMarkdownHint ? <MarkdownHint /> : null}
          </div>
        </div>
      </div>
      <DeviceView
        title={title}
        content={content}
        thumbnail={selectedThumbURL}
        onClose={() => setViewPost(false)}
        visible={viewPost}
      />
    </>
  );
}

export default PostForm;
