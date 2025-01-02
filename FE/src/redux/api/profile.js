import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const Profile = "/profile";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query({
      query: (id) => ({
        url: `${Profile}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),
    updateProfile: build.mutation({
      query: ({id,...data }) => ({
        url: `${Profile}/${id}`,
        method: "PATCH",
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [tagTypes.profile],
    }),
    updateProfileBanner: build.mutation({
      query: ({  id,formData }) => ({
        url: `${Profile}/banner/${id}`,
        method: "PATCH",
        data:formData,
        headers: {
         "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [tagTypes.profile],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateProfileBannerMutation,
} = profileApi;
