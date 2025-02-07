import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adminData: null,
  token: localStorage.getItem('adminToken') || null,
  isLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminCredentials: (state, action) => {
      const { accessToken, admin } = action.payload;
      state.token = accessToken;
      state.adminData = admin;
      localStorage.setItem('adminToken', accessToken);
      localStorage.setItem('adminData', JSON.stringify(admin));
    },
    setAdminData: (state, action) => {
      state.adminData = action.payload;
      localStorage.setItem('adminData', JSON.stringify(action.payload));
    },
    adminLogout: (state) => {
      state.token = null;
      state.adminData = null;
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setAdminCredentials,
  setAdminData,
  adminLogout,
  setLoading,
  setError,
} = adminSlice.actions;

export const selectCurrentAdmin = (state) => state.admin.adminData;
export const selectAdminToken = (state) => state.admin.token;
export const selectAdmin = (state) => state.admin;

export default adminSlice.reducer; 