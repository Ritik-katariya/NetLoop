import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const Promotion = "/promotion";

export const promotionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPromotion: build.query({
      query: (arg) => ({
        url: `${Promotion}`, // Replace `/networks` with the correct API endpoint
        method: "GET",
        params: arg, // `arg` is passed as search parameters
      }),
      providesTags:[tagTypes.promotion]
    }),
    
    getPromotion: build.query({
      query: (id) => ({
        url: `${Promotion}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.promotion],
    }),
    getPromotionByExplore: build.query({
      query: (exploreId) => ({
        url: `${Promotion}/explore/${exploreId}`,
        method: "GET",
      }),
      // providesTags: [tagTypes.promotion],
    }),
    
    deletePromotion: build.mutation({
      query: (id) => ({
        url: `${Promotion}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.promotion],
    }),
    updatePromotion: build.mutation({
      query: ({ data, id }) => ({
        url: `${Promotion}/${id}`,
        method: "PATCH",
        data: data,
        headers: {
          
        },
      }),
      invalidatesTags: [tagTypes.promotion],
    }),
   
    createPromotion: build.mutation({
      query: (formData) => ({
        url: `${Promotion}`,
        method: "POST",
        data: formData,
        headers:{
          
        } // Use `body` instead of `data` for `FormData`
      }),
      invalidatesTags: [tagTypes.promotion],
    }),
    
  }),
});

export const {
  useGetAllPromotionQuery,
  useGetPromotionQuery,
  useGetPromotionByExploreQuery,
  useDeletePromotionMutation,
  useUpdatePromotionMutation,
  useCreatePromotionMutation,
} = promotionApi;
