import { setUserInfo } from "../../utils/local-storage";
import { baseApi } from "./baseApi"

const AUTH_URL = '/auth'

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        userLogin: build.mutation({
            query: (loginData) => ({
                url: `${AUTH_URL}/login`,
                method: 'POST',
                data: loginData,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = (await queryFulfilled).data;
                    setUserInfo({ accessToken: result.accessToken });
                } catch (error) {
                }
            },
        }),
        forgetPassword: build.mutation({
            query: (email) => ({
                url: `${AUTH_URL}/forgot-password`,
                method: 'POST',
                data: email ,
            }),

           }),

           setNewPassword: build.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/set-new-password`,
                method: 'POST',
                data,
            }),
        })
       
      
    })
})

export const { 
    useUserLoginMutation, 
    useForgetPasswordMutation, 
    useSetNewPasswordMutation,  // add this line to use the mutation
   
} = authApi