import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../utils/api';

const getInitialState = () => ({
  data: null,
  isLoading: false,
  error: null,
});

export const createOrder = createAsyncThunk(
  'createdOrder/fetch',
  api.createOrder,
);

export const slice = createSlice({
  name: 'createdOrder',
  initialState: getInitialState(),
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.data = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const createOrderSelectors = {
  data: (state) => state.createdOrder.data,
};
export default slice.reducer;
