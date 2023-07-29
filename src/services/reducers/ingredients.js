import {
  createAsyncThunk,
  createSlice
} from "@reduxjs/toolkit";
import * as api from '../../utils/api';

const initialState = {
  data: [],
  isLoading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
  },
})

export default slice.reducer;