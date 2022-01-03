import { ImEye, ImSpinner11, ImSpinner3 } from "react-icons/im";
import React, { useEffect, useState } from "react";
import { useNotification } from "../context/NotificationProvider";
import MarkdownHint from "./MarkdownHint";
import DeviceView from "./DeviceView";
import { uploadImage } from "../api/post";
import PostTitleInput from "./PostTitleInput";
import ImageUploadButton from "./ImageUploadButton";
import CopyToClip from "./CopyToClip";

export const defaultPost = {
  title: "",
  content: "",
  thumbnail: "",
  meta: "",
  tags: "",
  featured: false,
};

function PostForm({
  formTitle = "Create New Post",
  busy,
  initialPost,
  postBtnTitle = "Post",
  resetAfterSubmit,
  onSubmit,
}) {
  const [imageUploading, setImageUploading] = useState(false);
  const [showMarkdownHint, setShowMarkdownHint] = useState(false);
  const [postInfo, setPostInfo] = useState({ ...defaultPost });
  const [selectedThumbURL, setSelectedThumbURL] = useState("");
  const [viewPost, setViewPost] = useState(false);
  const [imageLinkToCopy, setImageLinkToCopy] = useState("");

  const { updateNotification } = useNotification();

  useEffect(() => {
    if (initialPost) {
      setPostInfo(initialPost);
      setSelectedThumbURL(initialPost.thumbnail || "");
    }

    return () => {
      if (resetAfterSubmit) resetForm();
    };
  }, [initialPost]);

  const handleImageUpoad = async ({ target }) => {
    if (imageUploading) return;
    const imageFile = target.files[0];
    if (!imageFile) return;

    if (!imageFile.type.includes("image"))
      return updateNotification("error", "Invalid image file!");

    setImageUploading(true);

    const formData = new FormData();
    formData.append("image", imageFile);

    const { error, image } = await uploadImage(formData);
    setImageUploading(false);

    if (error) return updateNotification("error", error.message || error);

    setImageLinkToCopy(image);
  };

  const handleChange = ({ target }) => {
    const { value, name, checked } = target;

    // if the changed property is file then updating the ui (displaying selected image).
    if (name === "thumbnail") {
      const file = target.files[0];
      if (!file.type?.includes("image"))
        return updateNotification("error", "Invalid image file");
      setPostInfo({ ...postInfo, thumbnail: file });
      return setSelectedThumbURL(URL.createObjectURL(file));
    }

    if (name === "featured") {
      return setPostInfo({ ...postInfo, featured: checked });
    }

    if (name === "tags") {
      const newTags = postInfo.tags.split(",");
      if (newTags.length > 4) {
        updateNotification("warning", "Only first 4 tags will be selected.");
      }
    }

    const newPost = { ...postInfo, [name]: value };

    if (name === "meta" && value.length > 150) {
      setPostInfo({ ...postInfo, meta: value.substring(0, 150) });
    } else {
      setPostInfo({ ...newPost });
    }

    localStorage.setItem("blogPost", JSON.stringify(newPost));
  };

  const handleOnImageLinkCopied = () => {
    updateNotification("success", "Image link copied.");
  };

  const getTextToCopy = () => `![add description here](${imageLinkToCopy})`;

  /*
  =============== 
  Submitting post
  ===============
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, content, meta, thumbnail, tags, featured } = postInfo;

    if (!title.trim())
      return updateNotification("error", "Post title is missing!");

    if (!content.trim())
      return updateNotification("error", "Post content is missing!");

    if (!meta.trim())
      return updateNotification("error", "Post description is missing!");

    if (!tags.trim())
      return updateNotification("error", "Post tags are missing!");

    const slug = title
      .toLowerCase()
      .replace(/[^a-zA-Z ]/g, " ")
      .split(" ")
      .filter((val) => val.trim().toLowerCase())
      .join("-");

    const finalTags = tags
      .split(",")
      .map((t) => t.trim())
      .splice(0, 4);

    const finalPost = {
      title,
      content,
      slug,
      meta,
      thumbnail,
      featured,
      tags: JSON.stringify(finalTags),
    };
    const formData = new FormData();
    for (let key in finalPost) {
      formData.append(key, finalPost[key]);
    }

    onSubmit(formData);
  };

  const resetForm = () => {
    localStorage.removeItem("blogPost");
    setPostInfo({ ...defaultPost });
  };

  const { title, content, meta, tags, featured } = postInfo;

  return (
    <>
      <div className="max-w-screen-lg h-screen mx-auto flex">
        <div className="w-9/12 flex-1 flex flex-col justify-between p-2">
          <form
            onSubmit={handleSubmit}
            className="w-full mt-5 space-y-3 flex-1 flex flex-col"
          >
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-xl">{formTitle}</h1>
              <div className="flex items-center space-x-5">
                <button
                  type="button"
                  className="flex justify-center px-3 h-10 space-x-2 items-center text-blue-500 cursor-pointer rounded hover:bg-blue-500 hover:text-white ring-1 ring-blue-500 transition"
                  onClick={resetForm}
                >
                  <ImSpinner11 />
                  <span>Reset</span>
                </button>
                <button
                  type="button"
                  className="flex justify-center px-3 h-10 space-x-2 items-center text-blue-500 cursor-pointer rounded hover:bg-blue-500 hover:text-white ring-1 ring-blue-500 transition"
                  onClick={() => setViewPost(true)}
                >
                  <ImEye />
                  <span>View</span>
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white w-36 h-10 cursor-pointer rounded hover:bg-transparent hover:text-blue-500 hover:ring-1 border-blue-500 transition"
                >
                  {busy ? (
                    <ImSpinner3 className="text-2xl animate-spin mx-auto" />
                  ) : (
                    postBtnTitle
                  )}
                </button>
              </div>
            </div>
            <div>
              <input
                onChange={handleChange}
                name="featured"
                type="checkbox"
                hidden
                id="featured"
                value={featured}
              />

              <label
                className="group flex items-center cursor-pointer hover:"
                htmlFor="featured"
              >
                <div className="h-4 w-4 rounded-full border-2 border-gray-700 flex items-center justify-center mr-1 select-none group-hover:border-blue-500">
                  {featured && (
                    <div className="h-2 w-2 rounded-full bg-gray-700 group-hover:bg-blue-500" />
                  )}
                </div>
                <span className="text-gray-700 group-hover:text-blue-500">
                  Featured
                </span>
              </label>
            </div>

            <PostTitleInput
              value={title}
              name="title"
              onChange={handleChange}
              onFocus={() => setShowMarkdownHint(false)}
            />
            <div className="flex">
              <ImageUploadButton
                onChange={handleImageUpoad}
                busy={imageUploading}
              />

              {imageLinkToCopy ? (
                <CopyToClip
                  valueToCopy={getTextToCopy()}
                  value={imageLinkToCopy}
                  onCopied={handleOnImageLinkCopied}
                />
              ) : null}
            </div>
            <textarea
              onChange={handleChange}
              value={content}
              name="content"
              onFocus={() => setShowMarkdownHint(true)}
              placeholder="## You can write your here..."
              className="focus:ring-1 ring-blue-500 transition w-full resize-none border rounded-md outline-none p-2 text-lg flex-1 tracking-wide font-mono text-gray-700"
            ></textarea>

            {/* for tags */}
            <div>
              <label className="pb-2 text-gray-500" htmlFor="meta">
                Tags
              </label>
              <input
                value={tags}
                onChange={handleChange}
                className="focus:ring-1 ring-blue-500 transition w-full border rounded-md outline-none p-2"
                name="tags"
                placeholder="Add tags with comma: React, React Native"
              />
            </div>
            <div>
              <label className="pb-2 text-gray-500" htmlFor="meta">
                Meta description {meta.length} / 150
              </label>
              <textarea
                onChange={handleChange}
                value={meta}
                name="meta"
                placeholder="Write down little bit of post..."
                className="focus:ring-1 ring-blue-500 transition w-full h-28 resize-none border rounded-md outline-none p-2 text-lg tracking-wide font-mono text-gray-700"
              ></textarea>
            </div>
          </form>
        </div>
        <div className="w-1/4 p-2 sticky top-0">
          <h1 className="text-xl text-gray-500 font-semibold mb-2">
            Thumbnail
          </h1>
          <div className="w-full">
            <input
              onChange={handleChange}
              name="thumbnail"
              id="thumbnail"
              type="file"
              hidden
              accept="image/jpg, image/jpeg, image/png"
            />
            <label htmlFor="thumbnail" className="cursor-pointer">
              {selectedThumbURL ? (
                <img
                  className="aspect-video rounded shadow-md"
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
          <div className="absolute top-1/2 -translate-y-1/2">
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
