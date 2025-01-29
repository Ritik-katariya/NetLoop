import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const Rating = "/rating";

export const ratingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllRaing: build.query({
      query: (arg) => ({
        url: `${Rating}`, // Replace `/networks` with the correct API endpoint
        method: "GET",
        params: arg, // `arg` is passed as search parameters
      }),
      providesTags:[tagTypes.rating]
    }),
    
    getRating: build.query({
      query: (id) => ({
        url: `${Rating}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.rating],
    }),
    getRatingByExplore: build.query({
      query: (exploreId) => ({
        url: `${Rating}/explore/${exploreId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.rating],
    }),
    
    deleteRating: build.mutation({
      query: (id) => ({
        url: `${Rating}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.rating],
    }),
    updateRating: build.mutation({
      query: ({ data, id }) => ({
        url: `${Rating}/${id}`,
        method: "PATCH",
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [tagTypes.rating],
    }),
    voteOnRating: build.mutation({
      query: ({ data, id }) => ({
        url: `${Rating}/submit-vote/${id}`,
        method: "PATCH",
        data: data,
        headers: {
          
        },
      }),
      invalidatesTags: [tagTypes.rating],
    }),
   
    createRating: build.mutation({
      query: (formData) => ({
        url: `${Rating}`,
        method: "POST",
        data: formData,
        headers:{
          "Content-Type": "multipart/form-data",
        } // Use `body` instead of `data` for `FormData`
      }),
      invalidatesTags: [tagTypes.rating],
    }),
    
  }),
});

export const {
    useGetAllRatingQuery,
    useGetRatingQuery,
    useDeleteRatingMutation,
    useUpdateRatingMutation,
    useCreateRatingMutation,
    useVoteOnRatingMutation,
    useGetRatingByExploreQuery,
    


  
} = ratingApi;
