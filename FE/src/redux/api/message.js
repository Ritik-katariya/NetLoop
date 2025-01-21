import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const Messages = "/messages";

export const messageApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createMessage: build.mutation({
            query: ({ data}) => ({
                url: `${Messages}`,
                method: "POST",
                data: data,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
            invalidatesTags: [tagTypes.messages],
        }),
        getMessage: build.query({
            query: ({senderId,receiverId}) => ({
                url: `${Messages}/${senderId}/${receiverId}`,
                method: "GET",
            }),
            providesTags: [tagTypes.messages],
        }),
        updateMessage: build.mutation({
            query: ({ data, id }) => ({
                url: `${Messages}/${id}`,
                method: "PATCH",
                data: data,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
            invalidatesTags: [tagTypes.messages],
        }),
        deleteMessage: build.mutation({
            query: (id) => ({
                url: `${Messages}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.messages],
        }),
       
    }),
});

export const {
    useGetMessageQuery,
    useUpdateMessageMutation,
    useDeleteMessageMutation,
    useCreateMessageMutation,

  
 
} = messageApi;