import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const JoinRequest = "/join-request";

export const joinRequestApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    
    // 🟢 Fetch Join Requests for a Specific Member
    getJoinRequestsByMember: build.query({
      query: (memberId) => ({
        url: `${JoinRequest}/member/${memberId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.joinrequest]
    }),

    // 🟢 Fetch Join Requests for a Specific Network
    getJoinRequestsByNetwork: build.query({
      query: (networkId) => ({
        url: `${JoinRequest}/network/${networkId}`,
        method: "GET",
      }),
      providesTags: [ tagTypes.joinrequest]
    }),

    // 🟢 Fetch a Single Join Request by ID
    getJoinRequestById: build.query({
      query: (id) => ({
        url: `${JoinRequest}/${id}`,
        method: "GET",
      }),
      providesTags:  [  tagTypes.joinrequest ],
    }),

 

    // 🗑️ Delete a Join Request
    deleteJoinRequest: build.mutation({
      query: (id) => ({
        url: `${JoinRequest}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:[tagTypes.joinrequest]
    }),

    // 🟢 Create a New Join Request
    createJoinRequest: build.mutation({
      query: ({ data }) => ({
        url: `${JoinRequest}`,
        method: "POST",
        data: data,
        headers:{
            
        } // Corrected from `data` to `body`
      }),
      invalidatesTags: [{ type: tagTypes.joinrequest }],
    }),

  }),
});

// ✅ Export API Hooks
export const {
  useGetJoinRequestsByMemberQuery,
  useGetJoinRequestsByNetworkQuery,
  useGetJoinRequestByIdQuery,
  useDeleteJoinRequestMutation,
  useCreateJoinRequestMutation,
} = joinRequestApi;
