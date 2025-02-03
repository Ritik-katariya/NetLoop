import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const SAVED_URL = "/saved";

export const savedPostApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Toggle save status for a post/network/cluster
    toggleSave: build.mutation({
      query: (data) => ({
        url: `${SAVED_URL}/toggle`,
        method: "POST",
        data
      }),
      invalidatesTags: [tagTypes.post]
    }),

    // Get saved items for a member with pagination
    getSavedItems: build.query({
      query: ({ memberId, page = 1, limit = 10 }) => ({
        url: `${SAVED_URL}/${memberId}`,
        method: "GET",
        params: { page, limit }
      }),
      providesTags: [tagTypes.post]
    }),

    // Check save status for an item
    checkSaveStatus: build.query({
      query: ({ memberId, targetType, targetId }) => ({
        url: `${SAVED_URL}/status`,
        method: "GET",
        params: { memberId, targetType, targetId }
      }),
      providesTags: [tagTypes.post]
    })
  })
});

export const {
  useToggleSaveMutation,
  useGetSavedItemsQuery,
  useCheckSaveStatusQuery
} = savedPostApi;
