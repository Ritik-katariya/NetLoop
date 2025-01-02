import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: '',
};

const emailSlice = createSlice({
    name: 'email',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
    },
});

export const { setEmail } = emailSlice.actions;

// Selector to get the email from the state
export const selectEmail = (state) => state.email.email;

export default emailSlice.reducer;
