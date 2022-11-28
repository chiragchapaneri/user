import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiMiddleware from "../../utils/ApiMiddleware";
import toast from "react-hot-toast";
import Router from "next/router";

const initialState = {
  isLoading: false,
  allData: null,
};
export const resetFetchAPi = createAsyncThunk("page/fetch", async (values) => {
  try {
    const resetCredentials = await ApiMiddleware.post(
      "/auth/password/change",
      values
    );
    toast.success("password change successfull");
    Router.replace("/auth/login");
    return resetCredentials;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const resetSlice = createSlice({
  name: "resetpage",
  initialState,
  reducers: {},
  extraReducers: {
    [resetFetchAPi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [resetFetchAPi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allData = action.payload?.data;
    },
    [resetFetchAPi.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default resetSlice.reducer;
