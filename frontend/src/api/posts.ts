import axios from "axios";
import { DeletePost, NewPost, Post } from "../types/Post.type";

export const getPosts = async (userId: string): Promise<Post[]> => {
	const response = await axios.get(
		`${process.env.REACT_APP_API_BASE_URL}/posts?userId=${userId}`
	);
	const posts: Post[] = response.data;
	return posts;
};

export const deletePost = async (data: DeletePost): Promise<any> => {
	const response = await axios.delete(
		`${process.env.REACT_APP_API_BASE_URL}/posts?postId=${data?.postId}&userId=${data?.userId}`
	);
	return response;
};

export const addPost = async (data: NewPost): Promise<any> => {
	const response = await axios.post(
		`${process.env.REACT_APP_API_BASE_URL}/posts`,
		data
	);
	return response;
};
