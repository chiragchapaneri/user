import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiMiddleware from "../../utils/ApiMiddleware";

const initialState = {
  isLoding: false,
  serachData: undefined,
  isdata: false,
  totalPages: null,
};

export const categoriesApi = createAsyncThunk(
  "categoriesApi",
  async (values) => {
    try {
      const data = ApiMiddleware.get(
        `/event?etid=${values.etid ? values.etid : ""}&pcid=${
          values.pcid ? values.pcid : ""
        }&cid=${values.cid ? values.cid : ""}&search=${
          values.search ? values.search : ""
        } &startDate=${values.startDate ? values.startDate : ""}&endDate=${
          values.endDate ? values.endDate : ""
        }&dt=${values.dt ? values.dt : ""}&location=${
          values.location ? values.location : ""
        }&locationName=${
          values.locationName ? values.locationName : ""
        }&placeId=${values.placeId ? values.placeId : ""}&page=${
          values.page ? values.page : ""
        }&slug=${values.slug ? values.slug : ""}
        `
      );
      return data;
    } catch (er) {
      console.log(er);
    }
  }
);

const categorieSlice = createSlice({
  name: "searchevent",
  initialState,
  reducers: {},
  extraReducers: {
    [categoriesApi.pending]: (state, action) => {
      state.isLoading = true;
      state.serachData = [];
    },
    [categoriesApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      //   state.serachData = action.payload.data;
      //   state.totalPages = action.payload?.data?.totalPages;
      state.serachData = action.payload?.data?.data;
      state.totalPages = action.payload?.data?.totalPages;
      //   state.isLoading = true;
    },
    [categoriesApi.rejected]: (state, action) => {
      state.isLoading = true;
      state.serachData = [];
    },
  },
});

export default categorieSlice.reducer;
