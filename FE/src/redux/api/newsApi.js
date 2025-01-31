import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const News = "/news";

export const newsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllNews: build.query({
      query: (arg) => ({
        url: `${News}`, // Replace `/networks` with the correct API endpoint
        method: "GET",
        params: arg, // `arg` is passed as search parameters
      }),
      providesTags:[tagTypes.news]
    }),
    
    getNews: build.query({
      query: (id) => ({
        url: `${News}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.news],
    }),
    
    deleteNews: build.mutation({
      query: (id) => ({
        url: `${News}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.news],
    }),
    updateNews: build.mutation({
      query: ({ data, id }) => ({
        url: `${News}/${id}`,
        method: "PATCH",
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [tagTypes.news],
    }),
   
    createNews: build.mutation({
      query: (formData) => ({
        url: `${News}`,
        method: "POST",
        data: formData,
        headers:{
          "Content-Type": "multipart/form-data",
        } // Use `body` instead of `data` for `FormData`
      }),
      invalidatesTags: [tagTypes.news],
    }),
    
  }),
});

export const {
    useGetAllNewsQuery,
    useGetNewsQuery,
    useDeleteNewsMutation,
    useUpdateNewsMutation,
    useCreateNewsMutation,

  
} = newsApi;
