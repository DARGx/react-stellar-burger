import {
  createSlice} from '@reduxjs/toolkit';
import { AppState } from '../store';
import { Ingredient } from '../../types/ingredient';
import { createAppAsyncThunk } from '../thunk';
import * as api from '../../utils/api';
import { RequestStatus } from '../../utils/request-status';


type State = {
  data: Ingredient[];
  status: RequestStatus;
  error: string | null;
}

const initialState: State = {
  data: [],
  status: RequestStatus.INITIAL,
  error: null,
};

export const fetchIngredients = createAppAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, {
    dispatch,
    getState,
    rejectWithValue,
    fulfillWithValue
  }) => {
      const res = await api.getIngredients();
      return fulfillWithValue(res.data);
  }
)

export const slice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = RequestStatus.PENDING;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = RequestStatus.SUCCESS;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, { payload }) => {
        state.error = payload instanceof Error ? payload.message : 'Неизвестная ошибка';
        state.status = RequestStatus.ERROR;
      });
  },
});

export const ingredientsSelectors = {
  byId: (id: string) => (state: AppState) => state.ingredients.data.find((item) => item._id === id),
};

export default slice.reducer;

