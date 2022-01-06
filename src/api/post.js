import client from "./client";

export const uploadPost = async (formData) => {
  try {
    const { data } = await client.post("/post/create", formData);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const getPosts = async (pageNo, limit) => {
  try {
    const { data } = await client(
      "/post/posts?pageNo=" + pageNo + "&limit=" + limit
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const uploadImage = async (imageFile) => {
  try {
    const { data } = await client.post("/post/upload-image", imageFile);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const updatePost = async (postId, formData) => {
  try {
    const { data } = await client.put("/post/" + postId, formData);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const getPost = async (slug) => {
  try {
    const { data } = await client("/post/single/" + slug);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const deletePost = async (id) => {
  try {
    const { data } = await client.delete("/post/" + id);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const searchPost = async (query) => {
  try {
    const { data } = await client("/post/search?title=" + query);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};
