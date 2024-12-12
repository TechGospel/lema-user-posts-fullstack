import { connection } from "../connection";
import {
	createPostTemplate,
	deletePostTemplate,
	selectPostsTemplate,
} from "./query-tamplates";
import { Post } from "./types";
const { v4: uuidv4 } = require("uuid");

const generateUniqueId = () => {
	return uuidv4().replace(/-/g, "");
};

export const getPosts = (userId: string): Promise<Post[]> =>
	new Promise((resolve, reject) => {
		connection.all(selectPostsTemplate, [userId], (error, results) => {
			if (error) {
				reject(error);
			}
			resolve(results as Post[]);
		});
	});

export const insertPost = (userId: string, title: string, body: string) =>
	new Promise((resolve, reject) => {
		connection.all(
			createPostTemplate,
			[generateUniqueId(), userId, title, body],
			(error, results) => {
				if (error) {
					reject(error);
				}
				resolve(getPosts(userId));
			}
		);
	});

export const deletePost = (postId: string, userId: string) =>
	new Promise((resolve, reject) => {
		connection.all(deletePostTemplate, [postId], (error, results) => {
			if (error) {
				reject(error);
			}
			resolve(getPosts(userId));
		});
	});
