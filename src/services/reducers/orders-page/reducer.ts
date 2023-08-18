import { createReducer } from '@reduxjs/toolkit'
import { Order } from '../../../types/order';
import { wsMessageOrder } from './action';

export type TOrderList = {
    success: boolean,
    orders: Order[],
    total: number,
    totalToday: number
}

type TOrderState = {
    data: TOrderList | null
}

const initialState: TOrderState = {
    data: null
}

export const ordersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsMessageOrder, (state, action) => {
            state.data = action.payload
        })
})