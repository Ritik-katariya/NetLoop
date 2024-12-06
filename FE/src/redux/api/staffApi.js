import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"

const STAFF_URL = '/staff'

export const staffApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getStaffs: build.query({
            query: (arg) => ({
                url: `${STAFF_URL}`,
                method: 'GET',
                params: arg
            }),
            transformResponse: (response) =>{
                return {
                    staff: response.data,
                   
                }
            },
            providesTags: [tagTypes.doctor]
        }),
        getStaff: build.query({
            query: (id) => ({
                url: `${STAFF_URL}/${id}`,
                method: 'GET',
            }),
            providesTags: [tagTypes.doctor]
        }),
        getAppointbyDoc: build.query({
            query: (id) => ({
                url: `${STAFF_URL}/appoinmentbydoc/${id}`,
                method: 'GET',
            }),
            providesTags: [tagTypes.doctor]
        }),
        getAppointment: build.query({
            query: (id) => ({
                url: `${STAFF_URL}/appoinment/${id}`,
                method: 'GET',
            }),
            providesTags: [tagTypes.doctor]
        }),
        updateStaff: build.mutation({
            query: ({ data, id }) => ({
                url: `${STAFF_URL}/${id}`,
                method: 'PATCH',
                data: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
            invalidatesTags: [tagTypes.doctor]
        })
    })
})

export const { useGetStaffsQuery, useGetStaffQuery, useUpdateStaffMutation,useGetAppointbyDocQuery,useGetAppointmentQuery } = staffApi