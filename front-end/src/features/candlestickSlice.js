import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchData = createAsyncThunk('candlestick/fetchdata', async ({ startTime, endTime, timeFrame }) => {
    const response = await axios.get(`http://localhost:4004/api/candlestick?startTime=${startTime}&endTime=${endTime}&timeFrame=${timeFrame}`);
    return response.data.data;
});

const initialState = {
    data: [],
    status: 'idle'
}

const candlestickSlice = createSlice({
    name: 'candlestick',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, state => {
                state.status = "Loading";
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = "Succeeded";
                state.data = action.payload;
            })
            .addCase(fetchData.rejected, state => {
                state.status = 'Failed';
            });
    },
});

export default candlestickSlice.reducer;