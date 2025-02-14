import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const Details = "/details";

export const detailsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDetails: builder.query({
      query: (id) => ({
        url: `${Details}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.details],
    }),
    createDetails: builder.mutation({
      query: (data) => ({
        url: `${Details}/`,
        method: "POST",
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [tagTypes.details],
    }),
    updateProfileDetails: builder.mutation({
      query: ({ id,data }) => ({
        url: `${Details}/${id}`,
        method: "PATCH",
        data: data,
        headers: {
         
        },
      }),
      invalidatesTags: [tagTypes.details],
    }),
    deleteProfileDetails: builder.mutation({
      query: (id) => ({
        url: `${Details}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.details],
    }),
    updateWork: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${Details}/work/${id}`,
        method: "PATCH",
        data: data,
        headers: {
         
        },
      }),
      invalidatesTags: [tagTypes.details],
    }),
    updateEducation: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${Details}/education/${id}`,
        method: "PATCH",
        data: data,
        headers: {
         
        },
      }),
      invalidatesTags: [tagTypes.details],
    }),
    getWork: builder.query({
      query: (id) => ({
        url: `${Details}/work/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.details],
    }),
    getEducation: builder.query({
      query: (id) => ({
        url: `${Details}/education/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.details],
    }),
  }),
});

export const {
  useGetDetailsQuery,
  useCreateDetailsMutation,
  useUpdateProfileDetailsMutation,
  useDeleteProfileDetailsMutation,
  useUpdateWorkMutation,
  useUpdateEducationMutation,
  useGetWorkQuery,
  useGetEducationQuery,
} = detailsApi;
