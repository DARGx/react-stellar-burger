import { AppState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient, IngredientWithUid } from '../../types/ingredient';
import { v4 as uuidv4 } from 'uuid';

type State = {
  bun: Ingredient | null;
  ingredients: IngredientWithUid[];
}

export const slice = createSlice({
  name: 'burgerConstructor',
  initialState: {
    bun: null,
    ingredients: [],
  } as State,
  reducers: {
    addBun: (state, action: PayloadAction<Ingredient>) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<Ingredient>) => {
      const ingredient = {
        ...action.payload,
        uniqueId: uuidv4(),
      };

      state.ingredients = [...state.ingredients, ingredient];
    },
    removeIngredient: (state, action: PayloadAction<IngredientWithUid>) => {
      state.ingredients = state.ingredients.filter((ingredient) => {
        return ingredient.uniqueId !== action.payload.uniqueId;
      });
    },
    reset: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    reorder: (state, { payload }: PayloadAction<{ from: IngredientWithUid, to: IngredientWithUid }>) => {
      const getIndexByUniqueId = (uniqueId: string) =>
        state.ingredients.findIndex((ingredient) => ingredient.uniqueId === uniqueId);

      const fromIndex = getIndexByUniqueId(payload.from.uniqueId);
      const toIndex = getIndexByUniqueId(payload.to.uniqueId);

      const fromItem = state.ingredients.splice(fromIndex, 1)[0];
      state.ingredients.splice(toIndex, 0, fromItem);
    },
  },
});

export const burgerConstructorSelectors = {
  bun: (state: AppState) => state.burgerConstructor.bun,
  ingredients: (state: AppState) => state.burgerConstructor.ingredients,
  sum: ({ burgerConstructor }: AppState) => {
    const { ingredients, bun } = burgerConstructor;

    const ingredientsSum = ingredients.reduce((acc, ingredient) => {
      return acc + ingredient.price;
    }, 0);

    const bunsSum = bun ? bun.price * 2 : 0;

    return ingredientsSum + bunsSum;
  },
  orderIds: ({ burgerConstructor }: AppState) => {
    const ids = [];
    const { bun, ingredients } = burgerConstructor;

    if (bun) {
      ids.push(bun._id);
    }

    ingredients.forEach((ingredient) => {
      ids.push(ingredient._id);
    });

    return ids;
  },
};
export const burgerConstructorActions = slice.actions;
export default slice.reducer;