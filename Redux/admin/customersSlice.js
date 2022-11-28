import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiMiddleware from '../../utils/ApiMiddleware';

const initialState = {
    isLoading: true,
    customersList: [],
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    limit: 20,
    error: '',
};

export const fetchCustomersData = createAsyncThunk('allData/fetchCustomersData', async (data) => {
    const apidata = await ApiMiddleware.get(`/admin/list/users?limit=${data?.limit || ''}&orderBy=${data?.orderBy || ''}&page=${data?.page || ''}&search=${data?.search || ''}&location=${data?.location || ''}&gender=${data?.gender || ''}`)
    return apidata?.data
});

const customersSlice = createSlice({
    name: 'customersPage',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCustomersData.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchCustomersData.fulfilled]: (state, action) => {
            const {
                data,
                page,
                totalPages,
                totalRecords,
                limit,
            } = action.payload;
            state.isLoading = false
            state.customersList = [...data]
            state.currentPage = page
            state.totalPages = totalPages
            state.limit = limit
            state.totalRecords = totalRecords;
        },
        [fetchCustomersData.rejected]: (state, action) => {
            state.isLoading = false;
        },
    },
});

export default customersSlice.reducer;
