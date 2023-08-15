import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
import axios from "axios";
import { showSnackbar } from "./app";

const initialState = {
  isLoggedin: false,
  token: "",
  isLoading: false,
  email: "",
  error: false,
};
const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateIsLoading(state, action) {
      state.error = action.payload.error;
      state.isLoading = action.payload.isLoading;
    },
    login(state, action) {
      state.isLoggedin = action.payload.isLoggedin;
      state.token = action.payload.token;
    },
    signOut(state, action) {
      console.log("Inside Signout");
      state.isLoggedin = false;
      state.token = "";
    },
    updateRegisterEmail(state, action) {
      state.email = action.payload.email;
    },
  },
});

//Reducer
export default slice.reducer;

//log in
export function LoginUser(formValues) {
  //formValues=>{email,password}
  return async (dispatch, getState) => {
    await axiosInstance
      .post(
        "/auth/login",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        dispatch(
          slice.actions.login({
            isLoggedin: true,
            token: response.data.token,
          })
        );
        window.localStorage.setItem("user_id", response.data.user_id);
        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: "Login failed" }));
      });
  };
}

//Log out
export function LogoutUser() {
  return async (dispatch, getState) => {
    window.localStorage.removeItemItem("user_id");
    dispatch(slice.actions.signOut());
  };
}

// Forgot Password
export function ForgotPassword(formValues) {
  return async (dispatch, getState) => {
    await axiosInstance
      .post(
        "/auth/forgot-password",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

//new - password

export function NewPassword(formValues) {
  return async (dispatch, getState) => {
    await axiosInstance
      .post(
        "/auth/reset-password",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        dispatch(
          slice.actions.login({
            isLoggedin: true,
            token: response.data.token,
          })
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

// export
export function RegisterUser(formValues) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    await axiosInstance
      .post(
        "auth/register",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(
          slice.actions.updateRegisterEmail({ email: formValues.email })
        );
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      })
      .finally(() => {
        if (!getState().auth.error) {
          window.location.href = "/auth/verify";
        }
        // window.location.href = "/auth/verify";
      });
  };
}

//verify otp
export function VerifyEmail(formValues) {
  console.log("inside verify email");
  return async (dispatch, getState) => {
    await axiosInstance
      .post(
        "/auth/verify-otp",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(
          slice.actions.login({
            isLoggedin: true,
            token: response.data.token,
          })
        );
        window.localStorage.setItem("user_id", response.data.user_id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
