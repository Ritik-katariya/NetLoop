import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const Profile = "/details";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMembers: build.query({
      query: (arg) => ({
        url: `${Profile}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          doctors: response.data,
          meta: response.meta,
        };
      },
      providesTags: [tagTypes.profile],
    }),
    getMember: build.query({
      query: (id) => ({
        url: `${Profile}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),
    updateBanner: build.mutation({
      query: ({ data, id }) => ({
        url: `${Profile}/banner/${id}`,
        method: "PATCH",
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [tagTypes.profile],
    }),
    updateBanner: build.mutation({
      query: ({ data, id }) => ({
        url: `${Profile}/${id}`,
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
        url: `${Profile}/sendotp`,
        method: "POST",
        data,
      }),
    }),
    verifyOtp: build.mutation({
      query: (data) => ({
        url: `${Profile}/verifyOTP`,
        method: "POST",
        data,
      }),
    }),
    updateProfile: build.mutation({
      query: (data) => ({
        url: `${Profile}`,
        method: "PATCH",
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
  useCreateProfileMutation,
  useUpdateBannerMutation,
  

} = profileApi;
