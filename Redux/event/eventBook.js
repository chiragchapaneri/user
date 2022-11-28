import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiMiddleware from "../../utils/ApiMiddleware";
import toast from "react-hot-toast";
const initialState = {
  isLoding: false,
  showModel: false,
  status: false,
};

export const eventBookApi = createAsyncThunk(
  "eventBookApi",
  async (values, { rejectWithValue, dispatch }) => {
    try {
      const data = await ApiMiddleware.post(`/event/${values.eventid}/book`, {
        "tickets": values.tickets,
      });
      console.log("success");
      toast.success(data?.data?.message);
    } catch (error) {
      console.log("rejected");
      toast.error(error?.response?.data?.message);
      throw rejectWithValue(error?.response?.data?.message);
      // return { names: "hi" };
    }
  }
);

const eventBookApiSlice = createSlice({
  name: "eventBookApi",
  initialState,
  reducers: {
    showModelData: (state, action) => {
      state.showModel = action?.payload;
      state.status = false;
    },
  },
  extraReducers: {
    [eventBookApi.pending]: (state, action) => {
      state.isLoading = true;
      state.status = false;
      state.serachData = [];
    },
    [eventBookApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = true;
    },
    [eventBookApi.rejected]: (state, action) => {
      console.log("state", action);
      state.isLoading = false;
      state.showModel = true;
    },
  },
});

export default eventBookApiSlice.reducer;

export const { showModelData } = eventBookApiSlice.actions;
