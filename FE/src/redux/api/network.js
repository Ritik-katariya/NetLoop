import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const Network = "/network";

export const networkApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNetworks: build.query({
      query: (arg) => ({
        url: `${Network}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          doctors: response.data,
          meta: response.meta,
        };
      },
      providesTags: [tagTypes.network],
    }),
    getNetwork: build.query({
      query: (id) => ({
        url: `${Network}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.network],
    }),
    getMemberByNetwork: build.query({
      query: (id) => ({
        url: `${Network}/network/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.network],
    }),
    getNetworkByMember: build.query({
      query: (id) => ({
        url: `${Network}/member/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.network],
    }),
    deleteNetwork: build.mutation({
      query: (id) => ({
        url: `${Network}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.network],
    }),
    updateNetwork: build.mutation({
      query: ({ data, id }) => ({
        url: `${Network}/${id}`,
        method: "PATCH",
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [tagTypes.network],
    }),
    updateNetworkMember: build.mutation({
      query: ({ data, id }) => ({
        url: `${Network}/${id}`,
        method: "PATCH",
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [tagTypes.network],
    }),

    createNetwork: build.mutation({
      query: (formData) => ({
        url: `${Network}`,
        method: "POST",
        data: formData,
        headers:{
          "Content-Type": "multipart/form-data",
        } // Use `body` instead of `data` for `FormData`
      }),
      invalidatesTags: [tagTypes.network],
    }),
    
  }),
});

export const {
  useGetNetworksQuery,
  useGetNetworkQuery,
  useGetMemberByNetworkQuery,
  useGetNetworkByMemberQuery,
  useDeleteNetworkMutation,
  useUpdateNetworkMutation,
  useUpdateNetworkMemberMutation,
  useCreateNetworkMutation,
} = networkApi;
