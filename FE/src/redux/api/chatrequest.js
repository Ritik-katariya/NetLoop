import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const ChatRequest = "/request";

export const requestApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
       
        getRequest: build.query({
            query: (memberId) => ({
                url: `${ChatRequest}/member/${memberId}`,
                method: "GET",
            }),
            providesTags: [tagTypes.chatrequest],
        }),
        updateRequest: build.mutation({
            query: ({ data, id }) => ({
                url: `${ChatRequest}/${id}`,
                method: "PATCH",
                data: data,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
            invalidatesTags: [tagTypes.chatrequest],
        }),
        deleteRequest: build.mutation({
            query: (id) => ({
                url: `${ChatRequest}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.chatrequest],
        }),
        createRequest: build.mutation({
            query: (data) => ({
                url: `${ChatRequest}`,
                method: "POST",
                data,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
            invalidatesTags: [tagTypes.chatrequest],
        }),
    }),
});

export const {
    useGetRequestQuery,
    useUpdateRequestMutation,
    useDeleteRequestMutation,
    useCreateRequestMutation,
  
} = requestApi;