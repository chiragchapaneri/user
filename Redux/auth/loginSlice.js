import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiMiddleware from "../../utils/ApiMiddleware";
import toast from "react-hot-toast";
import Route from "next/router";
import Cookies from "js-cookie";
const initialState = {
  isLoading: false,
  allData: null,
};

export const loginFetchAPi = createAsyncThunk("/auth/login", async (values) => {
  try {
    const loginCredentials = await ApiMiddleware.post("/auth/login", {
      ...values,
    });
    Cookies.set("token", loginCredentials?.data?.data?.token);
    Cookies.set("role", loginCredentials?.data?.data?.user?.role);
    localStorage.setItem("token", loginCredentials?.data?.data?.token);
    localStorage.setItem(
      "firstname",
      loginCredentials?.data?.data?.user?.firstName
    );
    localStorage.setItem(
      "lastname",
      loginCredentials?.data?.data?.user?.lastName
    );
    localStorage.setItem("role", loginCredentials?.data?.data?.user?.role);
    localStorage.setItem("email", loginCredentials?.data?.data?.user?.email);
    localStorage.setItem(
      "avatar",
      loginCredentials?.data?.data?.user?.avatar || ""
    );

    toast.success("login successfull");
    Route.replace("/");
    return loginCredentials;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const loginSlice = createSlice({
  name: "loginPage",
  initialState,
  reducers: {},
  extraReducers: {
    [loginFetchAPi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loginFetchAPi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allData = action.payload?.data;
    },
    [loginFetchAPi.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default loginSlice.reducer;
