import axios from "axios";

import {
  clearError,
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  loginFail,
  loginRequest,
  loginSuccess,
  logoutFail,
  logoutSuccess,
  registerFail,
  registerRequest,
  registerSuccess,
} from "../Slices/authSlice";

import {
  deleteUserFail,
  deleteUserRequest,
  deleteUserSuccess,
  updateUserFail,
  updateUserRequest,
  updateUserSuccess,
  userFail,
  userRequest,
  usersFail,
  usersRequest,
  usersSuccess,
  userSuccess,
} from "../Slices/userSlice";

const BE_URL = import.meta.env.VITE_BE_URL;
axios.defaults.withCredentials = true;

//LOGIN

export const loginApi = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const response = await axios.post(
      `${BE_URL}/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        // Credentials: include,
      }
    );

    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFail(error.response.data.message || error.message));
  }
};

//clearAuth Error

export const clearAuthError = () => (dispatch) => {
  dispatch(clearError());
};

// REGISTER

export const registerApi = (userData) => async (dispatch) => {
  try {
    dispatch(registerRequest());

    const response = await axios.post(`${BE_URL}/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(registerFail(error.response?.data?.message || error.message));
  }
};

// My Profile

export const myProfileApi = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const response = await axios.get(`${BE_URL}/myProfile`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch(loadUserSuccess(response.data));
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};

// LOGOUT

export const logoutApi = async (dispatch) => {
  try {
    await axios.get(`${BE_URL}/logout`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFail(error));
  }
};

// verify email

export const emailVerifyApi = async (useremail) => {
  try {
    const response = await axios.post(`${BE_URL}/verify-email`, useremail);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.msg);
  }
};

//Reset password

export const resetPasswordApi = async (token, resetpassword) => {
  try {
    const response = await axios.post(
      `${BE_URL}/reset-password?token=${token}`,
      resetpassword
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.msg);
  }
};

// ADMIN

// Get all users
export const getAllUsersApi = async (dispatch) => {
  try {
    dispatch(usersRequest());
    const { data } = await axios.get(`${BE_URL}/admin/getAllUsers`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch(usersSuccess(data));
  } catch (error) {
    dispatch(usersFail(error.response.data.message));
  }
};

// Get single user
export const getSingleUserApi = (id) => async (dispatch) => {
  try {
    dispatch(userRequest());
    const { data } = await axios.get(`${BE_URL}/admin/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch(userSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data.message));
  }
};

//delete a single user

export const deleteUserApi = (id) => async (dispatch) => {
  try {
    dispatch(deleteUserRequest());
    await axios.delete(`${BE_URL}/admin/userDelete/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch(deleteUserSuccess());
  } catch (error) {
    dispatch(deleteUserFail(error.response.data.message));
  }
};

// update a single user

export const updateUserApi = (id, formData) => async (dispatch) => {
  try {
    dispatch(updateUserRequest());

    await axios.put(`${BE_URL}/admin/userUpdate/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch(updateUserSuccess());
  } catch (error) {
    dispatch(updateUserFail(error.response.data.message));
  }
};
