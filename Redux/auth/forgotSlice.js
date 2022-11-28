import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiMiddleware from "../../utils/ApiMiddleware";
import toast from "react-hot-toast";

const initialState = {
  isLoading: false,
  allData: null,
};

export const forgotFetchAPi = createAsyncThunk(
  "page/forgot",
  async (values) => {
    try {
      const loginCredentials = await ApiMiddleware.post(
        "auth/password/forgot",
        values
      );
      toast.success("Link to reset password sent");
      return loginCredentials;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const forgotSlice = createSlice({
  name: "forgotpage",
  initialState,
  reducers: {},
  extraReducers: {
    [forgotFetchAPi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [forgotFetchAPi.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [forgotFetchAPi.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default forgotSlice.reducer;
