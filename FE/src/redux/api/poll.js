import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const Poll = "/poll";

export const pollApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPolls: build.query({
      query: (arg) => ({
        url: `${Poll}`, // Replace `/networks` with the correct API endpoint
        method: "GET",
        params: arg, // `arg` is passed as search parameters
      }),
      providesTags:[tagTypes.poll]
    }),
    
    getPoll: build.query({
      query: (id) => ({
        url: `${Poll}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.poll],
    }),
    getPollbyExploreId: build.query({
      query: (exploreId) => ({
        url: `${Poll}/explore/${exploreId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.poll],
    }),
    
    deletePoll: build.mutation({
      query: (id) => ({
        url: `${Poll}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.poll],
    }),
    updatePoll: build.mutation({
      query: ({ data, id }) => ({
        url: `${Poll}/${id}`,
        method: "PATCH",
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [tagTypes.poll],
    }),
    voteOnPoll: build.mutation({
      query: ({id,data }) => ({
        url: `${Poll}/vote/${id}`,
        method: "PATCH",
        data: data,
        headers: {
          
        },
      }),
      invalidatesTags: [tagTypes.poll],
    }),
   
    createPoll: build.mutation({
      query: (formData) => ({
        url: `${Poll}`,
        method: "POST",
        data: formData,
        headers:{
          
        } // Use `body` instead of `data` for `FormData`
      }),
      invalidatesTags: [tagTypes.poll],
    }),
    
  }),
});

export const {
    useGetAllPollsQuery,
    useGetPollQuery,
    useDeletePollMutation,
    useUpdatePollMutation,
    useCreatePollMutation,
    useVoteOnPollMutation,
    useGetPollbyExploreIdQuery

  
} = pollApi;
