import Markdown from "markdown-to-jsx";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";

import { getPost } from "../api/post";
import { useNotification } from "../context/NotificationProvider";

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState({});
  const [fetching, setFetching] = useState(true);

  const { updateNotification } = useNotification();

  const fetchPost = async () => {
    const { error, post } = await getPost(slug);
    setFetching(false);
    if (error) {
      return updateNotification("error", error);
    }

    const { title, content, thumbnail, tags, meta, id } = post;
    setPost({
      title,
      content,
      thumbnail,
      tags: tags.join(", "),
      meta,
      id,
    });
  };

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const { title, content, thumbnail } = post;

  //   console.log(post, slug);
  //   return null;
  if (fetching)
    return (
      <div className="p-10 flex justify-center items-center">
        <ReactLoading type="bars" color="lightblue" />
      </div>
    );

  return (
    <div className="max-w-lg mx-auto">
      <img src={thumbnail} alt="" />
      <div className="px-2">
        <h1 className="text-gray-800 font-semibold text-xl py-2">{title}</h1>
        <div className="prose prose-sm prose-headings:my-2">
          {content && <Markdown>{content}</Markdown>}
        </div>
      </div>
    </div>
  );
}
