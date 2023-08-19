import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../thunk";
import { OrderProps } from "../../components/order-details/order-details";
import * as api from "../../utils/api";

export type State = {
  data: OrderProps["data"] | null;
  isLoading: boolean;
  error: string | null;
};

export const getInitialState = (): State => ({
  data: null,
  isLoading: false,
  error: null,
});

export const createOrder = createAppAsyncThunk(
  "createdOrder/fetch",
  api.createOrder
);

export const slice = createSlice({
  name: "createdOrder",
  initialState: getInitialState(),
  reducers: {},
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
      .addCase(createOrder.rejected, (state, { payload }) => {
        state.error =
          payload instanceof Error ? payload.message : "Неизвестная ошибка";
        state.isLoading = false;
      });
  },
});

export const createOrderSelectors = {
  data: (state: { createdOrder: State }) => state.createdOrder.data,
};
export default slice.reducer;
