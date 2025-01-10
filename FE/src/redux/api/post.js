import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const Post = "/post";

export const postApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query({
      query: (arg) => ({
        url: `${Post}`,
        method: "GET",
        params: arg,

      }),
      providesTags: [tagTypes.post],
    }),
    getPost: build.query({
      query: (id) => ({
        url: `${Post}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.post],
    }),
    deletePost: build.mutation({
      query: (id) => ({
        url: `${Post}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.post],
    }),
    updatePost: build.mutation({
      query: ({ data, id }) => ({
        url: `${Post}/${id}`,
        method: "PATCH",
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [tagTypes.post],
    }),

    createPost: build.mutation({
      query: (data) => ({
        url: `${Post}`,
        method: "POST",
        data,
      }),

    }),
    invalidatesTags: [tagTypes.post],
    
    getPostByMember:build.query({
      query: (memberId) => ({
        url: `${Post}/member/${memberId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.post],
    })
  }),
});


export const {
  useGetPostsQuery,
  useGetPostQuery,
  useUpdatePostMutation,
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostByMemberQuery
 
 
} = postApi;
