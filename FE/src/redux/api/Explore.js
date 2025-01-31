import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const Explore = "/explore";

export const exploreApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllExplore: build.query({
      query: (arg) => ({
        url: `${Explore}`, // Replace `/networks` with the correct API endpoint
        method: "GET",
        params: arg, // `arg` is passed as search parameters
      }),
      providesTags:[tagTypes.explore]
    }),
    
    getExplore: build.query({
      query: (id) => ({
        url: `${Explore}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.explore],
    }),
    
    
  }),
});

export const {
  useGetAllExploreQuery,
  useGetExploreQuery,
} = exploreApi;

  
