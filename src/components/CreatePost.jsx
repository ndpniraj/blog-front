import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadPost } from "../api/post";
import { useNotification } from "../context/NotificationProvider";
import PostForm, { defaultPost } from "./PostForm";

export default function CreatePost() {
  const [postInfo, setPostInfo] = useState({ ...defaultPost });
  const [uploadingPost, setUploadingPost] = useState(false);
  const navigate = useNavigate();

  const { updateNotification } = useNotification();

  const loadPostFromLocalStorage = () => {
    const result = localStorage.getItem("blogPost");
    if (!result) return;

    const oldPost = JSON.parse(result);
    setPostInfo({ ...postInfo, ...oldPost });
  };

  useEffect(() => {
    loadPostFromLocalStorage();
  }, []);

  const handleSubmit = async (data) => {
    
    setUploadingPost(true);
    const { error, post } = await uploadPost(data);
    setUploadingPost(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", "Post created successfully!");

    navigate("/update-post/" + post.slug);
  };

  return (
    <PostForm
      initialPost={postInfo}
      onSubmit={handleSubmit}
      busy={uploadingPost}
      resetAfterSubmit
    />
  );
}
