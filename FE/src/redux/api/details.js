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

    updateProfileDetails: builder.mutation({
      query: ({ id,...data }) => ({
        url: `${Details}/${id}`,
        method: "PUT",
       data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [tagTypes.details],
    }),
  }),
});

export const { 
  useGetDetailsQuery, 
  useUpdateProfileDetailsMutation 
} = detailsApi;
