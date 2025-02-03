import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const COMMENT_URL = "/comment";

export const commentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create a comment or reply
    createComment: build.mutation({
      query: (data) => ({
        url: `${COMMENT_URL}/create`,
        method: "POST",
        data
      }),
      invalidatesTags: [tagTypes.comment]
    }),

    // Get comments for a post
    getComments: build.query({
      query: ({ postId, page = 1, limit = 10 }) => ({
        url: `${COMMENT_URL}/${postId}`,
        method: "GET",
        params: { page, limit }
      }),
      providesTags: [tagTypes.comment]
    }),

    // Get replies for a comment
    getReplies: build.query({
      query: ({ commentId, page = 1, limit = 10 }) => ({
        url: `${COMMENT_URL}/replies/${commentId}`,
        method: "GET",
        params: { page, limit }
      }),
      providesTags: [tagTypes.comment]
    }),

    // Update a comment
    updateComment: build.mutation({
      query: ({ id, data }) => ({
        url: `${COMMENT_URL}/${id}`,
        method: "PATCH",
        data
      }),
      invalidatesTags: [tagTypes.comment]
    }),

    // Delete a comment
    deleteComment: build.mutation({
      query: (id) => ({
        url: `${COMMENT_URL}/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: [tagTypes.comment]
    })
  })
});

export const {
  useCreateCommentMutation,
  useGetCommentsQuery,
  useGetRepliesQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation
} = commentApi; 