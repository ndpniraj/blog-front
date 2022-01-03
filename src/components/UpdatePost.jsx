import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useParams } from "react-router-dom";

import { getPost, updatePost } from "../api/post";
import { useNotification } from "../context/NotificationProvider";
import NotFound from "./NotFound";
import PostForm from "./PostForm";

export default function UpdatePost() {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const [uploadingPost, setUploadingPost] = useState(false);
  const [fetchingPost, setFetchingPost] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const { updateNotification } = useNotification();

  const fetchPost = async () => {
    const { error, post } = await getPost(slug);
    setFetchingPost(false);
    if (error) {
      setNotFound(true);
      return updateNotification("error", error);
    }

    const { title, content, thumbnail, tags, meta, id, featured } = post;
    setPostInfo({
      title,
      content,
      thumbnail,
      tags: tags.join(", "),
      meta,
      featured,
      id,
    });
  };

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const handleSubmit = async (data) => {
    setUploadingPost(true);
    const { error, post } = await updatePost(postInfo?.id, data);
    setUploadingPost(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", "Post updated successfully!");
    const { title, content, thumbnail, tags, meta, id, featured } = post;
    setPostInfo({
      title,
      content,
      thumbnail,
      tags: tags.join(", "),
      meta,
      featured,
      id,
    });
  };

  if (fetchingPost)
    return (
      <div className="p-10 flex justify-center items-center">
        <ReactLoading type="bars" color="lightblue" />
      </div>
    );

  if (notFound) return <NotFound />;

  return (
    <PostForm
      formTitle="Update Post"
      initialPost={postInfo}
      onSubmit={handleSubmit}
      busy={uploadingPost}
      postBtnTitle="Update"
    />
  );
}
