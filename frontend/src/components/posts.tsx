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
  const currentPage = state?.currentPage || 0;

  const onAddSuccess = () => {
    toast.success("Post added successfully!");
    resetForm();
  };

  const {
    posts,
    addPost,
    deletePost,
    isLoading,
    isAddingPost,
    isDeletingPost,
  } = usePosts(userId!, onAddSuccess);

  const validatePost = (title: string, content: string) => {
    if (!title.trim() || !content.trim()) {
      return false;
    }

    if (title.trim().length < 10 || content.trim().length < 10) {
      return false;
    }

    return true;
  };

  const handleAddPost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validatePost(title, content)) {
      toast.error(
        "Title and content are required with minimum of 10 characters each."
      );
      return;
    }

    try {
      await addPost({ userId: userId!, title, body: content });
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

  const showEllipsis = (post: string) => {
    if (post.length > 205) {
      return post.substring(0, 205) + "...";
    }
    return post;
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader backgroundColor={"#a3a1a1"} />
      </div>
    );

  return (
    <div className="p-4 mx-auto max-w-[850px]">
      <div className="mb-4 items-center">
        <p
          onClick={() => navigate(-1)}
          className="text-[#535862] cursor-pointer flex items-center gap-2 text-sm font-semibold"
        >
          <FaArrowLeft /> Back to Users
        </p>
        <h2 className="text-[36px] font-medium text-[#181D27] py-2">
          {user?.fullName}
        </h2>
        <p className="block md:flex  items-center text-sm">
          {user?.email} <LuDot className="hidden md:flex" size={30} />{" "}
          <span className="font-semibold block mt-2 md:mt-0 md:flex">{`${posts?.length} posts`}</span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div
          onClick={() => setAddPostModalOpen(true)}
          className="p-4 cursor-pointer border border-dashed text-[#717680] min-h-[250px] border-gray-300 rounded-lg flex flex-col items-center justify-center"
        >
          <LuCirclePlus strokeWidth={2.5} />
          <button className="font-semibold text-sm py-1">New Post</button>
        </div>
        {posts?.map((post: Post) => (
          <div
            key={post.id}
            className="pt-2 px-6 pb-6 border border-gray-300 rounded-lg shadow-md"
          >
            <div className="px-2 pb-4">
              <div className="flex items-center justify-end my-2 -mr-4">
                <button
                  className="text-[#fa6b7d] hover:text-red-500"
                  onClick={() => handleDeletePost(post?.id, userId)}
                >
                  <FaTrashAlt size={13} />
                </button>
              </div>
              <h3
                title={post.title}
                className="font-medium text-[18px] leading-6 w-4/5 mb-3 break-words"
              >
                {post.title}
              </h3>
              <p className="text-sm break-words" title={post.body}>
                {showEllipsis(post?.body)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isAddPostModalOpen}
        onClose={() => {
          setAddPostModalOpen(false);
        }}
        title="New Post"
        width="w-[600px]"
      >
        <div className="flex flex-col justify-center items-center">
          <form className="w-full">
            <div className="mb-5">
              <label className="block mb-2 text-lg font-medium text-[#535862]">
                Post Title
              </label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-small font-normal border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:border-gray-500 block w-full p-2.5"
                placeholder="Give your post a title"
                disabled={isAddingPost}
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-lg font-medium  text-[#535862]">
                Post Content
              </label>
              <textarea
                rows={6}
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="text-small font-normal resize-none border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:border-gray-500 block w-full p-2.5"
                placeholder="Write something mind-blowing"
                disabled={isAddingPost}
                required
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={resetForm}
                className="border px-5 py-2 text-center rounded-md"
                disabled={isAddingPost}
              >
                Cancel
              </button>

              <button
                onClick={handleAddPost}
                className="bg-[#334155] text-white px-5 py-2 text-center rounded-md"
                disabled={isAddingPost}
              >
                {isAddingPost ? (
                  <span className="flex items-center gap-2">
                    Publish{" "}
                    <span className="mt-2">
                      <Loader backgroundColor={"#ffffff"} size={"20px"} />
                    </span>
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
