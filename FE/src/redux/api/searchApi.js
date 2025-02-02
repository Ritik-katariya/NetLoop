import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const SEARCH_URL = "/search";

export const searchApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    search: build.query({
      query: ({ query }) => ({
        url: `${SEARCH_URL}`,
        method: "GET",
        params: { query },
      }),
      providesTags: [tagTypes.search],
    }),
  }),
});

export const { useSearchQuery } = searchApi; 