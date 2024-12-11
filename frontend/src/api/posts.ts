import axios from "axios";

export interface Post {
  id: string;
  userId: string;
  title: string;
  body: string;
}

export interface NewPost {
  userId: string;
  title: string;
  body: string;
}

export const getPosts = async (userId: string): Promise<Post[]> => {
  const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/posts?userId=${userId}`);
  const posts: Post[] = response.data;
  return posts;
};

export const deletePost = async (postId: string): Promise<any> => {
  const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/posts?postId=${postId}`);
  return response
};

export const addPost = async (data:NewPost): Promise<any> => {
  const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/posts`, data);
  return response
};
