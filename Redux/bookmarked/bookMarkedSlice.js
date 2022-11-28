import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiMiddleware from "../../utils/ApiMiddleware";
import toast from "react-hot-toast";
import { eventForMeApi } from "./eventForMe";

const initialState = {
  isLoading: false,
  detailspage: false,
  id: null,
};

export const bookMarkedApi = createAsyncThunk(
  "bookmarked",
  async (values, { dispatch, getState }) => {
    try {
      const state = getState();
      const data = await ApiMiddleware.post(`/event/${values.id}/bookmark`, {
        "bookmark": values.marked,
      });

      dispatch(eventForMeApi());

      toast.success(data.data.message);
      if (values?.detail) {
        return {
          datas: "iasgcug",
        };
      } else {
        return {
          datas: "iasgcugasc",
        };
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const bookMarkedSlice = createSlice({
  name: "bookMarkedApi",
  initialState,
  reducers: {},
  extraReducers: {
    [bookMarkedApi.pending]: (state, action) => {
      console.log("action ", action);
      state.isLoading = true;
      state.id = action.meta.arg.id;
      if (action.meta.arg?.detail) {
        state.detailspage = true;
      } else {
        state.isLoading = true;
      }
      // state.id = action.meta.arg.id;
    },
    [bookMarkedApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.detailspage = false;
    },
    [bookMarkedApi.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default bookMarkedSlice.reducer;
