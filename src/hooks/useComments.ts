import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { IComment } from "../interfaces";
import { toast } from "sonner";
import { useDebounce } from "./useDebounce";

export interface IFormData {
  name: string;
  email: string;
  body: string;
  postId: number;
  id: number;
}

export function useComments() {
  const params = useParams();
  const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    email: "",
    body: "",
    postId: 1,
    id: 1,
  });

  const queryClient = useQueryClient();
  const debouncedSearch = useDebounce(searchQuery, 500);

  const fetchComments = async (page: number): Promise<IComment[]> => {
    const url = new URL(`${baseUrl}/comments`);
    url.searchParams.append("_page", page.toString());
    url.searchParams.append("_limit", itemsPerPage.toString());

    if (debouncedSearch) {
      url.searchParams.append("name_like", debouncedSearch);
    }

    const res = await fetch(url.toString());
    const totalCount = res.headers.get("X-Total-Count");
    if (totalCount) {
      setTotalPages(Math.ceil(parseInt(totalCount, 10) / itemsPerPage));
    }
    return res.json();
  };

  const createComment = async (newComment: IComment) => {
    const res = await fetch(`${baseUrl}/comments`, {
      method: "POST",
      body: JSON.stringify(newComment),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (res) {
      toast.success("Comment created");
    }
    return res.json();
  };

  const getCommentById = async (id: number): Promise<IComment> => {
    const res = await fetch(`${baseUrl}/comments/${id}`);
    return res.json();
  };

  const updateComment = async (updatedComment: IComment) => {
    const res = await fetch(`${baseUrl}/comments/${updatedComment.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedComment),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (res) {
      toast.success("Comment updated");
    }
    return res.json();
  };

  const deleteComment = async (id: number) => {
    const res = await fetch(`${baseUrl}/comments/${id}`, { method: "DELETE" });
    if (res) {
      toast.success("Comment deleted");
    }
    return res.json();
  };

  const {
    data = [],
    isLoading,
    isFetching,
    isSuccess,
    refetch: refetchComment,
  } = useQuery<IComment[]>({
    queryKey: ["comments", currentPage, itemsPerPage, debouncedSearch],
    queryFn: () => fetchComments(currentPage),
    staleTime: 1000,
    placeholderData: [],
  });

  const { mutate: addComment, isPending: addingComment } =
    useMutation<IComment>({
      mutationFn: async () => {
        return await createComment(formData);
      },
      onSuccess: (newComment) => {
        queryClient.setQueryData<IComment[]>(
          ["comments", currentPage, itemsPerPage],
          (oldComments) => [newComment, ...(oldComments || [])]
        );

        setFormData({
          name: "",
          email: "",
          body: "",
          postId: 1,
          id: 1,
        });
      },

      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.error ||
          error.message ||
          "Failed to Add Comment.";
        alert(errorMessage);
      },
    });

  const { data: commentDetails, isLoading: isCommentLoading } =
    useSuspenseQuery<IComment>({
      queryKey: ["comment", params.id],
      queryFn: () => getCommentById(Number(params.id)),
    });

  const {
    mutate: updateCommentById,
    isPending: updatingComment,
    data: updatedComment,
  } = useMutation({
    mutationFn: async (updatedComment: IComment) => {
      return await updateComment(updatedComment);
    },
    onSuccess: (updatedComment: IComment) => {
      return updatedComment;
    },
  });

  const {
    mutate: removeComment,
    isPending: removingComment,
    data: removedComment,
  } = useMutation({
    mutationFn: async (id: number) => {
      return await deleteComment(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleAddComment = () => {
    addComment();
  };

  const handleUpdateComment = (updatedComment: IComment) => {
    updateCommentById(updatedComment);
  };

  const handleDeleteComment = (id: number) => {
    removeComment(id);
  };

  return {
    isSuccess,
    refetchComment,
    data,
    isLoading,
    isFetching,
    currentPage,
    totalPages,
    itemsPerPage,
    formData,
    addingComment,
    commentDetails,
    isCommentLoading,
    updatingComment,
    updatedComment,
    searchQuery,
    setSearchQuery,
    handleUpdateComment,
    removingComment,
    handleDeleteComment,
    removedComment,
    setFormData,
    addComment,
    handleAddComment,
    handleNext,
    handlePrev,
    setCurrentPage,
    setItemsPerPage,
  };
}
