import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    memberId: '',
    name: '',
   networks: [],
   verified:null,
   memberData:null
};

const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        setMember: (state, action) => {
            state.memberId = action.payload.memberId;
            state.name = action.payload.name;
            state.networks = action.payload.networks || [];
            state.verified=action.payload.verified;
            state.memberData=action.payload.memberData;
        },
    },
});

export const { setMember } = memberSlice.actions;

// Selector to get the memberId from the state
export const selectMemberId = (state) => state.member.memberId;
export const selectMember = (state) => state.member;
export const selectVerified = (state) => state.member.verified;
export const selectData = (state) => state.member.memberData;

export default memberSlice.reducer;
// Selector to get the networks from the state
export const selectNetworks = (state) => state.member.networks;