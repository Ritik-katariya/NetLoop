import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const Story = "/story";

export const storyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStories: build.query({
      query: (arg) => ({
        url: `${Story}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.story],
    }),
    getStory: build.query({
      query: (id) => ({
        url: `${Story}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.story],
    }),
    deleteStory: build.mutation({
      query: (id) => ({
        url: `${Story}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.story],
    }),
    updateStory: build.mutation({
      query: ({ data, id }) => ({
        url: `${Story}/${id}`,
        method: "PATCH",
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [tagTypes.story],
    }),
    createStory: build.mutation({
      query: ({formData}) => ({
        url: `${Story}`,
        method: "POST",
        data: formData,  // ✅ Use 'body' instead of 'data'
        headers: {
          // Ensure backend supports multipart/form-data
          // "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [tagTypes.story],
    }),
    
     
    getStoryByMember: build.query({
      query: (memberId) => ({
        url: `${Story}/member/${memberId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.story],
    }),
  }),
});

export const {
  useGetStoriesQuery,
  useGetStoryQuery,
  useUpdateStoryMutation,
  useCreateStoryMutation,
  useDeleteStoryMutation,
  useGetStoryByMemberQuery,
} = storyApi;
