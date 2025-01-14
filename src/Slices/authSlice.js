import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: null,
    error: null,
    isUpdated: false,
    message: null,
  },

  reducers: {
    // LOGIN
    loginRequest(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // CLEAR ERROR
    clearError(state) {
      state.error = null;
    },

    // REGISTER
    registerRequest(state) {
      state.loading = true;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    registerFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    //LOAD USER
    loadUserRequest(state) {
      state.loading = true;
    },
    loadUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loadUserFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // LOGOUT
    logoutSuccess(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // UPDATE PROFILE
    updateProfileRequest(state) {
      state.loading = true;
      state.isUpdated = false;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.isUpdated = true;
    },

    updateProfileFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearUpdateProfile(state) {
      state.isUpdated = false;
    },

    // UPDATE PASSWORD
    updatePasswordRequest(state) {
      state.loading = true;
      state.isUpdated = false;
    },
    updatePasswordSuccess(state) {
      state.loading = false;
      state.isUpdated = true;
    },
    updatePasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // FORGET PASSWORD
    forgetPasswordRequest(state) {
      state.loading = true;
      state.message = null;
    },
    forgetPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    forgetPasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // RESET PASSWORD
    resetPasswordRequest(state) {
      state.loading = true;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    resetPasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  clearError,
  registerRequest,
  registerSuccess,
  registerFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  logoutSuccess,
  logoutFail,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  clearUpdateProfile,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  forgetPasswordRequest,
  forgetPasswordSuccess,
  forgetPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
} = authSlice.actions;

export default authSlice.reducer;
