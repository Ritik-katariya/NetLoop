import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const Chat = "/chat";

export const chatApi = baseApi.injectEndpoints({
    endpoints: (build) => ({


        getChat: build.query({
            query: (memberId) => ({
                url: `${Chat}/member/${memberId}`,
                method: "GET",
              
            }),            
            providesTags: [tagTypes.chat],
        }),


      
        updateChat: build.mutation({
            query: ({ memberId, id }) => ({
                url: `${Chat}/add-member/${id}`,
                method: "PATCH",
                data: memberId,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
            invalidatesTags: [tagTypes.chat],
        }),
       
    }),
});

export const {
    useGetChatQuery,
    useUpdateChatMutation,
} = chatApi;