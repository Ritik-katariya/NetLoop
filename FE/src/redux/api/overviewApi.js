import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"

const OVERVIEW_URL= '/overview'

export const overviewApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getOverview: build.query({
            query: (args) => ({
                url: `${OVERVIEW_URL}/${args}`,
                method: 'GET',
                
            }),
            providesTags: [tagTypes.overview]
        })
    })
})
export const {
    useGetOverviewQuery
}=overviewApi