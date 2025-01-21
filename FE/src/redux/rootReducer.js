import { baseApi } from "./api/baseApi";
import invoiceSlice from "./feature/invoiceSlice";
import emailSlice from "./feature/emailSlice";
 import memberSlice from "./feature/memberSlice";
 import profileSlice from "./feature/profileSlice";
 import chatSlice from "./feature/chatSlice";

export const reducer = {
    [baseApi.reducerPath]: baseApi.reducer,
    invoice: invoiceSlice,
    email: emailSlice,
    member: memberSlice,
    profile:profileSlice,
    chat: chatSlice
}