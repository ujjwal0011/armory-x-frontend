import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/user`;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    error: null,
    message: null,
    emailForVerification: null,
  },
  reducers: {
    registerRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.emailForVerification = action.payload.email;
      state.error = null;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    verifyEmailRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    verifyEmailSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
      state.emailForVerification = null;
      state.error = null;
    },
    verifyEmailFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    loginRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
      state.error = null;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    logoutRequest(state) {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.message = action.payload;
      state.error = null;
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getUserRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    getUserFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    resendVerificationRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resendVerificationSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    resendVerificationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    clearErrors(state) {
      state.error = null;
    },

    clearMessages(state) {
      state.message = null;
    },
  },
});

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    error: null,
    message: null,
    isUpdated: false,
    isDeleted: false,
  },
  reducers: {
    updateProfileRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.isUpdated = false;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.isUpdated = true;
      state.error = null;
    },
    updateProfileFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
      state.isUpdated = false;
    },
    updateProfileReset(state) {
      state.isUpdated = false;
    },

    updatePasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.isUpdated = false;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.isUpdated = true;
      state.error = null;
    },
    updatePasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
      state.isUpdated = false;
    },
    updatePasswordReset(state) {
      state.isUpdated = false;
    },

    deleteAccountRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.isDeleted = false;
    },
    deleteAccountSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.isDeleted = true;
      state.error = null;
    },
    deleteAccountFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
      state.isDeleted = false;
    },
    deleteAccountReset(state) {
      state.isDeleted = false;
    },

    clearErrors(state) {
      state.error = null;
    },

    clearMessages(state) {
      state.message = null;
    },
  },
});

const passwordResetSlice = createSlice({
  name: "passwordReset",
  initialState: {
    loading: false,
    error: null,
    message: null,
    success: false,
  },
  reducers: {
    forgotPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.success = false;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.success = true;
      state.error = null;
    },
    forgotPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
      state.success = false;
    },

    resetPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.success = false;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.success = true;
      state.error = null;
    },
    resetPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
      state.success = false;
    },
    resetPasswordReset(state) {
      state.success = false;
    },

    clearErrors(state) {
      state.error = null;
    },

    clearMessages(state) {
      state.message = null;
    },
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFailed,
  verifyEmailRequest,
  verifyEmailSuccess,
  verifyEmailFailed,
  loginRequest,
  loginSuccess,
  loginFailed,
  logoutRequest,
  logoutSuccess,
  logoutFailed,
  getUserRequest,
  getUserSuccess,
  getUserFailed,
  resendVerificationRequest,
  resendVerificationSuccess,
  resendVerificationFailed,
  clearErrors: clearAuthErrors,
  clearMessages: clearAuthMessages,
} = authSlice.actions;

export const {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailed,
  updateProfileReset,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFailed,
  updatePasswordReset,
  deleteAccountRequest,
  deleteAccountSuccess,
  deleteAccountFailed,
  deleteAccountReset,
  clearErrors: clearProfileErrors,
  clearMessages: clearProfileMessages,
} = profileSlice.actions;

export const {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailed,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailed,
  resetPasswordReset,
  clearErrors: clearPasswordResetErrors,
  clearMessages: clearPasswordResetMessages,
} = passwordResetSlice.actions;

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(registerFailed(error.response.data.message));
  }
};

export const verifyEmail = (verificationData) => async (dispatch) => {
  dispatch(verifyEmailRequest());
  try {
    const response = await axios.post(
      `${API_URL}/verify-email`,
      verificationData,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(verifyEmailSuccess(response.data));
  } catch (error) {
    dispatch(verifyEmailFailed(error.response.data.message));
  }
};

export const login = (loginData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${API_URL}/login`, loginData, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailed(error.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  dispatch(logoutRequest());
  try {
    const response = await axios.get(`${API_URL}/logout`, {
      withCredentials: true,
    });
    dispatch(logoutSuccess(response.data.message));
  } catch (error) {
    dispatch(logoutFailed(error.response.data.message));
  }
};

export const getUserProfile = () => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      withCredentials: true,
    });
    console.log("API Response:", response.data);
    dispatch(getUserSuccess(response.data.user));
  } catch (error) {
    console.error("API Error:", error);
    dispatch(
      getUserFailed(error.response?.data?.message || "An error occurred")
    );
  }
};

export const updateProfile = (profileData) => async (dispatch) => {
  dispatch(updateProfileRequest());
  try {
    const response = await axios.put(`${API_URL}/update-profile`, profileData, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(updateProfileSuccess(response.data));
  } catch (error) {
    dispatch(updateProfileFailed(error.response.data.message));
  }
};

export const updatePassword = (passwordData) => async (dispatch) => {
  dispatch(updatePasswordRequest());
  try {
    const response = await axios.put(
      `${API_URL}/update-password`,
      passwordData,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(updatePasswordSuccess(response.data.message));
  } catch (error) {
    dispatch(updatePasswordFailed(error.response.data.message));
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(forgotPasswordRequest());
  try {
    const response = await axios.post(
      `${API_URL}/forgot-password`,
      { email },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(forgotPasswordSuccess(response.data.message));
  } catch (error) {
    dispatch(forgotPasswordFailed(error.response.data.message));
  }
};

export const resetPassword = (resetData) => async (dispatch) => {
  dispatch(resetPasswordRequest());
  try {
    const response = await axios.post(`${API_URL}/reset-password`, resetData, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(resetPasswordSuccess(response.data.message));
  } catch (error) {
    dispatch(resetPasswordFailed(error.response.data.message));
  }
};

export const resendVerificationOTP = (email) => async (dispatch) => {
  dispatch(resendVerificationRequest());
  try {
    const response = await axios.post(
      `${API_URL}/resend-verification`,
      { email },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(resendVerificationSuccess(response.data.message));
  } catch (error) {
    dispatch(resendVerificationFailed(error.response.data.message));
  }
};

export const deleteAccount = () => async (dispatch) => {
  dispatch(deleteAccountRequest());
  try {
    const response = await axios.delete(`${API_URL}/delete-account`, {
      withCredentials: true,
    });
    dispatch(deleteAccountSuccess(response.data.message));
  } catch (error) {
    dispatch(deleteAccountFailed(error.response.data.message));
  }
};

export const authReducer = authSlice.reducer;
export const profileReducer = profileSlice.reducer;
export const passwordResetReducer = passwordResetSlice.reducer;
