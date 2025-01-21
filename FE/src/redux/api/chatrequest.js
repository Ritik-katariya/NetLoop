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
            providesTags: (result, error, memberId) => [{ type: tagTypes.chatrequest, id: memberId }],
        }),
        updateRequest: build.mutation({
            query: ({ data, id }) => ({
                url: `${ChatRequest}/${id}`,
                method: "PATCH",
                body: data, // Use 'body' instead of 'data'
            }),
            invalidatesTags: (result, error, { id }) => [{ type: tagTypes.chatrequest, id }],
        }),
        deleteRequest: build.mutation({
            query: (id) => ({
                url: `${ChatRequest}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{ type: tagTypes.chatrequest, id }],
        }),
        createRequest: build.mutation({
            query: ({data}) => ({
                url: `${ChatRequest}/create`,
                method: "POST",
                data: data,
                headers: {
                  
                },
            }),
            invalidatesTags: [{ type: tagTypes.chatrequest }],
        }),
    }),
});

export const {
    useGetRequestQuery,
    useUpdateRequestMutation,
    useDeleteRequestMutation,
    useCreateRequestMutation,
} = requestApi;
