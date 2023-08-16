import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit';
import * as api from '../../utils/api';

export const fetchIngredient = createAsyncThunk(
  'currentIngredient/fetch',
  async (data) => {
    return await api.getIngredientById(data);
  },
);

const getInitialState = () => ({ data: null });

export const slice = createSlice({
  name: 'currentIngredient',
  initialState: getInitialState(),
  reducers: {
    set: (state, action) => {
      state.data = action.payload;
    },
    unset: (state) => {
      state.data = null;
    },
    reset: (state, action) => {
      state.data = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchIngredient.fulfilled, (state, { payload }) => {
      state.data = payload;
    })
  },
});

export const currentIngredientActions = slice.actions;
export default slice.reducer;