import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"

const COMMENT_URL = '/comment'

export const commentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createComment: build.mutation({
            query: (data) => ({
                url: `${COMMENT_URL}`,
                method: 'POST',
                data: data,
                headers: {
                    'Content-Type':'application/json'
                },
            }),
            invalidatesTags: [tagTypes.comment]
        }),
        getAllComment: build.query({
            query: () => ({
                url: `${COMMENT_URL}/`,
                method: 'GET',
                
            }),
           
            providesTags: [tagTypes.comment]
        }),
        getSingleComment: build.query({
            query: (id) => ({
                url: `${COMMENT_URL}/${id}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.comment]
        }),
        updateComment: build.mutation({
            query: ({ data, id }) => ({
                url: `${COMMENT_URL}/${id}`,
                method: 'PATCH',
                data: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
            invalidatesTags: [tagTypes.comment]
        }),
        deleteComment: build.mutation({
            query: (id) => ({
                url: `${COMMENT_URL}/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [tagTypes.comment]
        }),
    })
})

export const {
    useCreateCommentMutation,
    useDeleteCommentMutation,
    useGetAllCommentQuery,
    useUpdateCommentMutation,
    useGetSingleCommentQuery
} = commentApi