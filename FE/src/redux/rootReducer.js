import { baseApi } from "./api/baseApi";
import invoiceSlice from "./feature/invoiceSlice";
import emailSlice from "./feature/emailSlice"; // Import the new email slice

export const reducer = {
    [baseApi.reducerPath]: baseApi.reducer,
    invoice: invoiceSlice,
    email: emailSlice, // Add the email slice to the reducer
}