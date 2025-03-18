import { configureStore } from '@reduxjs/toolkit';
import candlestickSlice from '../features/candlestickSlice.js'

export const store = configureStore({
    reducer: {
        data: candlestickSlice
    },
});