import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const Verification = "/verification";

export const verificationApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getVerifications: build.query({
            query: (arg) => ({
                url: `${Verification}`,
                method: "GET",
                params: arg,
            }),
            transformResponse: (response) => {
                return {
                    verifications: response.data,
                    meta: response.meta,
                };
            },
            providesTags: [tagTypes.verification],
        }),
        getVerification: build.query({
            query: (id) => ({
                url: `${Verification}/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.verification],
        }),
        updateVerification: build.mutation({
            query: ({ data, id }) => ({
                url: `${Verification}/${id}`,
                method: "PATCH",
                data: data,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
            invalidatesTags: [tagTypes.verification],
        }),
        deleteVerification: build.mutation({
            query: (id) => ({
                url: `${Verification}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.verification],
        }),
        createVerification: build.mutation({
            query: (data) => ({
                url: `${Verification}`,
                method: "POST",
                data,
            }),
            invalidatesTags: [tagTypes.verification],
        }),
    }),
});

export const {
    useGetVerificationsQuery,
    useGetVerificationQuery,
    useUpdateVerificationMutation,
    useDeleteVerificationMutation,
    useCreateVerificationMutation,
} = verificationApi;