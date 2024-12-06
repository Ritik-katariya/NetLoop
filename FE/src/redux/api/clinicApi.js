import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"

const CLINIC_URL = '/clinic'

export const clinicApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getDoctorClinics: build.query({
            query: (doctorId) => ({
                url: `${CLINIC_URL}/all/${doctorId}`,
                method: 'GET',
            }),
            providesTags: [tagTypes.clinic]
        }),
        editDoctorClinic: build.mutation({
            query: (data) => ({
                url: `${CLINIC_URL}`,
                method: 'PATCH',
                data: data
            }),
            invalidatesTags: [tagTypes.clinic]
        }),
        deleteDoctorClinic: build.mutation({
            query: (id) => ({
                url: `${CLINIC_URL}/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [tagTypes.clinic]
        }),
        createDoctorClinic: build.mutation({
            query: (data) => ({
                url: `${CLINIC_URL}/create`,
                method: 'POST',
                data: data
            }),
            invalidatesTags: [tagTypes.clinic]
        }),
        getSpecificClinic: build.query({
            query: (id) => ({
                url: `${CLINIC_URL}/${id}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.clinic]
        })
    })
});

export const {
    useCreateDoctorClinicMutation,
    useDeleteDoctorClinicMutation,
    useEditDoctorClinicMutation,
    useGetDoctorClinicsQuery,
    useGetSpecificClinicQuery
} = clinicApi