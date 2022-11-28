import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiMiddleware from '../../utils/ApiMiddleware';
import toast from 'react-hot-toast';

const initialState = {
  isLoading: false,
  bookMarkedData: undefined,
  bookid: undefined,
};

export const eventForMeApi = createAsyncThunk(
  '/user/bookmark-events',
  async () => {
    try {
      const apiData = await ApiMiddleware.get('/user/bookmark-events');
      const bookid = apiData?.data?.data?.map((data) => data.id);
      return { bookedata: apiData?.data?.data, bookid: bookid };
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const eventForMeSlice = createSlice({
  name: 'eventforme',
  initialState,
  reducers: {},
  extraReducers: {
    [eventForMeApi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [eventForMeApi.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.bookMarkedData = action.payload?.bookedata;
      state.bookid = action.payload?.bookid;
    },
    [eventForMeApi.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default eventForMeSlice.reducer;
