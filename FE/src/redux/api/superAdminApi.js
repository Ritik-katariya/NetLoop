import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const SUPER_ADMIN_URL = "/super-admin";

export const superAdminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create super admin
    createSuperAdmin: build.mutation({
      query: (data) => ({
        url: `${SUPER_ADMIN_URL}/create`,
        method: "POST",
        data
      }),
      invalidatesTags: [tagTypes.admin]
    }),

    // Super admin login
    loginSuperAdmin: build.mutation({
      query: (data) => ({
        url: `${SUPER_ADMIN_URL}/login`,
        method: "POST",
        data
      })
    }),

    // Get super admin by ID
    getSuperAdminById: build.query({
      query: (id) => ({
        url: `${SUPER_ADMIN_URL}/${id}`,
        method: "GET"
      }),
      providesTags: (result, error, id) => [{ type: tagTypes.admin, id }]
    }),

    // Update super admin
    updateSuperAdmin: build.mutation({
      query: ({ id, data }) => ({
        url: `${SUPER_ADMIN_URL}/${id}`,
        method: "PATCH",
        data
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: tagTypes.admin, id },
        tagTypes.admin
      ]
    })
  })
});

export const {
  useCreateSuperAdminMutation,
  useLoginSuperAdminMutation,
  useGetSuperAdminByIdQuery,
  useUpdateSuperAdminMutation
} = superAdminApi; 