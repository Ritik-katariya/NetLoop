import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  memberData: null,
  token: localStorage.getItem('accessToken') || null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, member } = action.payload;
      state.token = accessToken;
      state.memberData = member;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('memberData', JSON.stringify(member));
    },
    setMemberData: (state, action) => {
      state.memberData = action.payload;
      localStorage.setItem('memberData', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.token = null;
      state.memberData = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('memberData');
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Actions
export const {
  setCredentials,
  setMemberData,
  logout,
  setLoading,
  setError,
} = authSlice.actions;

// Selectors
export const selectCurrentMember = (state) => state.auth.memberData;
export const selectCurrentToken = (state) => state.auth.token;
export const selectAuth = (state) => state.auth;
export const selectMemberData = (state) => state.auth?.memberData;

export default authSlice.reducer; 