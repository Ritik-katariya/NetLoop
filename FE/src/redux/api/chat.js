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
            query: ({ id, data }) => ({
                url: `${Chat}/add-member/${id}`,
                method: "PATCH",
                data: data,
                headers: {
                   
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