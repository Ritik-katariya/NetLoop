import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const POST_URL = "/post";

export const postApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get all posts with pagination
    getPosts: build.query({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: `${POST_URL}`,
        method: "GET",
        params: { page, limit }
      }),
      providesTags: [tagTypes.post]
    }),

    // Get a single post
    getPost: build.query({
      query: (id) => ({
        url: `${POST_URL}/${id}`,
        method: "GET"
      }),
      providesTags: (result, error, id) => [{ type: tagTypes.post, id }]
    }),

    // Create a post
    createPost: build.mutation({
      query: (data) => ({
        url: `${POST_URL}/create`,
        method: "POST",
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: [tagTypes.post]
    }),

    // Update a post
    updatePost: build.mutation({
      query: ({ id, data }) => ({
        url: `${POST_URL}/${id}`,
        method: "PATCH",
        data
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: tagTypes.post, id },
        tagTypes.post
      ]
    }),

    // Delete a post
    deletePost: build.mutation({
      query: (id) => ({
        url: `${POST_URL}/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: [tagTypes.post]
    }),

    // Get posts by member
    getMemberPosts: build.query({
      query: ({ memberId, page = 1, limit = 10 }) => ({
        url: `${POST_URL}/member/${memberId}`,
        method: "GET",
        params: { page, limit }
      }),
      providesTags: [tagTypes.post]
    }),

    // Like a post
    likePost: build.mutation({
      query: (postId) => ({
        url: `${POST_URL}/${postId}/like`,
        method: "POST"
      }),
      invalidatesTags: (result, error, postId) => [
        { type: tagTypes.post, id: postId },
        tagTypes.post,
        tagTypes.notification
      ]
    }),

    // Get posts by network
    getNetworkPosts: build.query({
      query: ({ networkId, page = 1, limit = 10 }) => ({
        url: `${POST_URL}/network/${networkId}`,
        method: "GET",
        params: { page, limit }
      }),
      providesTags: [tagTypes.post]
    })
  })
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetMemberPostsQuery,
  useGetNetworkPostsQuery,
  useLikePostMutation
} = postApi; 