import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiMiddleware from "../../utils/ApiMiddleware";
import toast from "react-hot-toast";

const initialState = {
  serachData: null,
  isdata: false,
  totalPages: null,
  isLoading: false,
  markerData: null,
  totalRecords: 0,
};

export const searchEventApi = createAsyncThunk(
  "event/serach",
  async (values) => {
    try {
      const apidata = await ApiMiddleware.get(
        `/event?etid=${values.etid ? values.etid : ""}&pcid=${
          values.pcid ? values.pcid : ""
        }&cid=${values.cid ? values.cid : ""}&search=${
          values.search ? values.search : ""
        }&startDate=${values.startDate ? values.startDate : ""}&endDate=${
          values.endDate ? values.endDate : ""
        }&dt=${values.dt ? values.dt : ""}&location=${
          values.location ? values.location : ""
        }&locationName=${
          values.locationName ? values.locationName : ""
        }&placeId=${values.placeId ? values.placeId : ""}&page=${
          values.page ? values.page : ""
        }&slug=${values.slug ? values.slug : ""}&limit=${
          values.limit ? values.limit : ""
        }
        `
      );

      const markerData = apidata.data?.data.map((data) => {
        return {
          lat: data.latitude,
          lng: data.longitude,
          id: data.id,
          ...data,
        };
      });

      return {
        searchData: apidata.data?.data,
        markerData: markerData,
        totalPages: apidata.data.totalPages,
        totalRecords: apidata.data.totalRecords,
      };
    } catch (error) {
      console.log(error);
    }
  }
);

const searchEventSlice = createSlice({
  name: "searchevent",
  initialState,
  reducers: {
    resetSearchData: (state, action) => {
      state.serachData = null;
      state.totalPages = null;
    },
  },
  extraReducers: {
    [searchEventApi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [searchEventApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.markerData = action.payload?.markerData;
      state.serachData = action.payload?.searchData;
      state.totalPages = action.payload?.totalPages;
      state.totalRecords = action.payload?.totalRecords;
    },
    [searchEventApi.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default searchEventSlice.reducer;
export const { resetSearchData } = searchEventSlice.actions;
