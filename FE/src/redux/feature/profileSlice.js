import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: null,
    img: '',
    memberId: '',
    bio: ''
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile(state, action) {
            state.id = action.payload.id;
            state.img = action.payload.img;
            state.memberId = action.payload.memberId;
            state.bio = action.payload.bio;
        },
        updateProfile(state, action) {
            const { id, img, memberId, bio } = action.payload;
            if (id !== undefined) state.id = id;
            if (img !== undefined) state.img = img;
            if (memberId !== undefined) state.memberId = memberId;
            if (bio !== undefined) state.bio = bio;
        },
        clearProfile(state) {
            state.id = null;
            state.img = '';
            state.memberId = '';
            state.bio = '';
        }
    }
});

export const { setProfile, updateProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
export const selectProfile = (state) => state.profile;