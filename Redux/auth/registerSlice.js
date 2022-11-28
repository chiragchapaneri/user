import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiMiddleware from "../../utils/ApiMiddleware";
import toast from "react-hot-toast";
import Route from "next/router";
const initialState = {
  isLoading: false,
};

export const registerFetchAPi = createAsyncThunk(
  "auth/register",
  async (values) => {
    try {
      const RegisterDetails = await ApiMiddleware.post(
        "/auth/register",
        values
      );
      Route.replace("/auth/login");
      toast.success(RegisterDetails.data.message);
      return RegisterDetails;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

const registerSlice = createSlice({
  name: "registerPage",
  initialState,
  reducers: {},
  extraReducers: {
    [registerFetchAPi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [registerFetchAPi.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [registerFetchAPi.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default registerSlice.reducer;
