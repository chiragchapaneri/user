import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiMiddleware from "../../utils/ApiMiddleware";

const initialState = {
  isLoading: false,
  bookingData: [],
  page: null,
  totalPages: null,
  orderData: {},
  tableOrderData: [],
  notFoound: false,
};

export const orderDetails = createAsyncThunk(
  "Booking Order",
  async (values, { getState }) => {
    try {
      const apiData = await ApiMiddleware.get(`/user/bookings/766536016325956`);
      return {
        data: apiData?.data?.data,
        table: apiData?.data?.data?.bookedTickets,
      };
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const myBookingApi = createAsyncThunk(
  "myBooking",
  async (values, { getState }) => {
    const state = getState().myBookingSlice.bookingData;
    try {
      const apiData = await ApiMiddleware.get(
        `/user/bookings?limit=5&page=${
          values?.page ? values?.page : 1
        }&search=${values?.search ? values?.search : ""} `
      );

      if (apiData?.data?.data?.totalRecords > 0) {
        if (values.page) {
          return {
            bookingData: [...state, ...apiData?.data?.data?.data],
            page: apiData?.data?.data?.page,
            totalPages: apiData?.data?.data?.totalPages,
          };
        } else {
          return {
            bookingData: [...apiData?.data?.data?.data],
            page: apiData?.data?.data?.page,
            totalPages: apiData?.data?.data?.totalPages,
          };
        }
      } else {
        return {
          bookingData: [],
          page: apiData?.data?.data?.page,
          totalPages: apiData?.data?.data?.totalPages,
          notFoound: true,
        };
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const myBookingSlice = createSlice({
  name: "eventforme",
  initialState,
  reducers: {},
  extraReducers: {
    [myBookingApi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [myBookingApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.bookingData = action?.payload?.bookingData;
      state.page = action?.payload?.page;
      state.totalPages = action?.payload?.totalPages;
    },
    [myBookingApi.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default myBookingSlice.reducer;
