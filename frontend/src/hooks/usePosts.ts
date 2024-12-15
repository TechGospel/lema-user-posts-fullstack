import { useMutation, useQuery, useQueryClient } from "react-query";
import { getPosts, addPost, deletePost } from "../api/posts";
import { Post } from "../types/Post.type";
import { toast } from "sonner";

export const usePosts = (userId: string, onTaskSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery(["posts", userId], () =>
    getPosts(userId)
  );

  const { mutate: addPostMutation, isLoading: isAddingPost } = useMutation(
    addPost,
    {
      onSuccess: (updatedPosts) => {
        queryClient.setQueryData(["posts", userId], updatedPosts?.data);
        onTaskSuccess?.();
      },
    }
  );

  const { mutate: deletePostMutation, isLoading: isDeletingPost } = useMutation(
    deletePost,
    {
      onSuccess: (updatedPosts) => {
        queryClient.setQueryData(["posts", userId], updatedPosts?.data);
      },
    }
  );

  return {
    posts: data || [],
    isLoading,
    isAddingPost,
    isDeletingPost,
    error,
    addPost: addPostMutation,
    deletePost: deletePostMutation,
    refetch,
  };
};
