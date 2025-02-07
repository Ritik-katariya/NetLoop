import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const ADMIN_URL = "/admin";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create admin
    createAdmin: build.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/create`,
        method: "POST",
        data
      }),
      invalidatesTags: [tagTypes.admin]
    }),

    // Admin login
    loginAdmin: build.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/login`,
        method: "POST",
        data
      })
    }),

    // Get all admins
    getAllAdmins: build.query({
      query: () => ({
        url: `${ADMIN_URL}/all`,
        method: "GET"
      }),
      providesTags: [tagTypes.admin]
    }),

    // Get admin by ID
    getAdminById: build.query({
      query: (id) => ({
        url: `${ADMIN_URL}/${id}`,
        method: "GET"
      }),
      providesTags: (result, error, id) => [{ type: tagTypes.admin, id }]
    }),

    // Update admin
    updateAdmin: build.mutation({
      query: ({ id, data }) => ({
        url: `${ADMIN_URL}/${id}`,
        method: "PATCH",
        data
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: tagTypes.admin, id },
        tagTypes.admin
      ]
    }),

    // Delete admin
    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: [tagTypes.admin]
    })
  })
});

export const {
  useCreateAdminMutation,
  useLoginAdminMutation,
  useGetAllAdminsQuery,
  useGetAdminByIdQuery,
  useUpdateAdminMutation,
  useDeleteAdminMutation
} = adminApi; 