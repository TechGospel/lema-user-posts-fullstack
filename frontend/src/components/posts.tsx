import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { deletePost, getPosts, addPost } from "../api/posts";
import { FaTrashAlt, FaArrowLeft } from "react-icons/fa";
import { LuCirclePlus, LuDot } from "react-icons/lu";
import Modal from "./modal";
import Loader from "../shared/loader";
import { toast } from "sonner";
import { Post } from "../types/Post.type";
import { usePosts } from "../hooks/usePosts";

export const Posts = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { state } = useLocation();
	const user = state?.user;
	const [isAddPostModalOpen, setAddPostModalOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const { userId = "" } = useParams();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const currentPage = queryParams.get("page") || "0";

	const {
		posts,
		addPost,
		deletePost,
		isLoading,
		isAddingPost,
		isDeletingPost,
	} = usePosts(userId!);

	const handleAddPost = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (!title.trim() || !content.trim()) {
			alert("Title and content are required.");
			return;
		}

		try {
			await addPost({ userId: userId!, title, body: content });
			toast.success("Post added successfully!");
			resetForm();
		} catch (error) {
			toast.error("Failed to add post");
		}
	};

	const handleDeletePost = async (postId: string, userId: string) => {
		try {
			await deletePost({ postId: postId!, userId: userId! });
			toast.success("Post deleted successfully!");
		} catch (error) {
			toast.error("Failed to delete post");
		}
	};

	const resetForm = () => {
		setAddPostModalOpen(false);
		setTitle("");
		setContent("");
	};

	if (isLoading)
		return (
			<div className="flex justify-center items-center min-h-screen">
				<Loader backgroundColor={"#a3a1a1"} />
			</div>
		);

	return (
		<div className="p-4">
			<div className="mb-4 items-center">
				<p
					onClick={() => navigate(`/?page=${currentPage}`)}
					className="text-[#535862] hover:underline flex items-center gap-2">
					<FaArrowLeft /> Back to Users
				</p>
				<h2 className="text-3xl text-[#181D27] font-semibold py-2">
					{user?.fullName}
				</h2>
				<p className="flex items-center">
					{user?.email} <LuDot size={30} /> {`${posts?.length} posts`}
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
				<div
					onClick={() => setAddPostModalOpen(true)}
					className="p-4 cursor-pointer border border-dashed text-[#717680] min-h-[250px] border-gray-300 rounded-md flex flex-col items-center justify-center">
					<LuCirclePlus />
					<button className="">New Post</button>
				</div>
				{posts?.map((post: Post) => (
					<div
						key={post.id}
						className="p-4 border border-gray-300 rounded-lg shadow-md">
						<div className="flex items-center justify-end mt-4">
							<button
								className="text-red-400 hover:text-red-500"
								onClick={() =>
									handleDeletePost(post?.id, userId)
								}>
								<FaTrashAlt />
							</button>
						</div>
						<h3 className="font-bold">{post.title}</h3>
						<p title={post.body}>
							{post.body.substring(0, 160) + "..."}
						</p>
					</div>
				))}
			</div>

			<Modal
				isOpen={isAddPostModalOpen}
				onClose={() => {
					setAddPostModalOpen(false);
				}}
				title="New Post"
				width="w-[500px]">
				<div className="flex flex-col justify-center items-center">
					<form className="w-full">
						<div className="mb-5">
							<label className="block mb-2 text-sm font-medium  dark:text-white">
								Post Title
							</label>
							<input
								type="text"
								name="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-500 block w-full p-2.5"
								placeholder="Give your post a title"
								disabled={isAddingPost}
								required
							/>
						</div>
						<div className="mb-5">
							<label className="block mb-2 text-sm font-medium  dark:text-white">
								Post Content
							</label>
							<textarea
								rows={6}
								name="content"
								value={content}
								onChange={(e) => setContent(e.target.value)}
								className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-500 block w-full p-2.5"
								placeholder="Write something mind-blowing"
								disabled={isAddingPost}
								required
							/>
						</div>

						<div className="flex justify-end gap-3">
							<button
								onClick={resetForm}
								className="border px-5 py-2 text-center rounded-md"
								disabled={isAddingPost}>
								Cancel
							</button>

							<button
								onClick={handleAddPost}
								className="bg-[#334155] text-white px-5 py-2 text-center rounded-md"
								disabled={isAddingPost}>
								{isAddingPost ? (
									<span className="flex items-center">
										Publish{" "}
										<Loader backgroundColor={"#ffffff"} />
									</span>
								) : (
									"Publish"
								)}
							</button>
						</div>
					</form>
				</div>
			</Modal>
		</div>
	);
};
