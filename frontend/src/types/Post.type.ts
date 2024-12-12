export interface Post {
	id: string;
	userId: number;
	title: string;
	body: string;
}

export interface NewPost {
	userId: string;
	title: string;
	body: string;
}

export interface DeletePost {
	postId: string;
	userId: string;
}
