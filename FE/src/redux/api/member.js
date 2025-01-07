import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const Member = "/member";

export const memberApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMembers: build.query({
      query: (arg) => ({
        url: `${Member}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.profile],
    }),
    getMember: build.query({
      query: (id) => ({
        url: `${Member}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),
    updateMember: build.mutation({
      query: ({ data, id }) => ({
        url: `${Member}/${id}`,
        method: "PATCH",
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [tagTypes.profile],
    }),
    sendOtp: build.mutation({
      query: (data) => ({
        url: `${Member}/sendotp`,
        method: "POST",
        data,
      }),
    }),
    verifyOtp: build.mutation({
      query: (data) => ({
        url: `${Member}/verifyOTP`,
        method: "POST",
        data,
      }),
    }),
    createMember: build.mutation({
      query: (data) => ({
        url: `${Member}`,
        method: "POST",
        data,
      }),
    }),
  }),
});

export const {
  useGetMembersQuery,
  useGetMemberQuery,
  useUpdateMemberMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useCreateMemberMutation,
} = memberApi;
