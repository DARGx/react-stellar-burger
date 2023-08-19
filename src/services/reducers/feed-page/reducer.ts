import { createReducer } from "@reduxjs/toolkit";
import { Order } from "../../../types/order";
import { wsMessageFeed } from "./action";

export type TOrderList = {
  success: boolean;
  orders: Order[];
  total: number;
  totalToday: number;
};

type TOrderState = {
  data: TOrderList | null;
};

const initialState: TOrderState = {
  data: null,
};

export const feedReducer = createReducer(initialState, (builder) => {
  builder.addCase(wsMessageFeed, (state, action) => {
    state.data = action.payload;
  });
});
