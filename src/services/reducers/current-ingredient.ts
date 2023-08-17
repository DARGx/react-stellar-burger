import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';

type currentIngredientState = {
  data: string | null
}

const getInitialState = (): currentIngredientState => ({ data: null });

export const slice = createSlice({
  name: 'currentIngredient',
  initialState: getInitialState(),
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      state.data = action.payload;
    },
    unset: (state) => {
      state.data = null;
    },
    reset: (state, action: PayloadAction<string>) => {
      state.data = action.payload
    }
  },
});

export const currentIngredientActions = slice.actions;
export default slice.reducer;