import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const LIKE_URL = "/like";

export const likeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    toggleLike: build.mutation({
      query: (data) => ({
        url: `${LIKE_URL}/toggle`,
        method: "POST",
        data:data 
      }),
      invalidatesTags: [tagTypes.like]
    }),

    getLikes: build.query({
      query: ({targetType, targetId}) => ({
        url: `${LIKE_URL}/${targetType}/${targetId}`,
        method: "GET"
      }),
      providesTags: [tagTypes.like]
    }),

    checkLikeStatus: build.query({
      query: ({targetId, memberId,targetType}) => ({
        url: `${LIKE_URL}/status`,
        method: "GET",
        params: { targetId, memberId, targetType }
      }),
      providesTags: [tagTypes.like]
    })
  })
});

export const {
  useToggleLikeMutation,
  useGetLikesQuery,
  useCheckLikeStatusQuery
} = likeApi;
