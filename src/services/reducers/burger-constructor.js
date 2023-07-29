import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const getInitialState = () => ({
  bun: null,
  ingredients: [],
});

export const slice = createSlice({
  name: 'burgerConstructor',
  initialState: getInitialState(),
  reducers: {
    addBun: (state, action) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action) => {
      const ingredient = {
        ...action.payload,
        uniqueId: uuidv4(),
      };

      state.ingredients = [...state.ingredients, ingredient];
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter((ingredient) => {
        return ingredient.uniqueId !== action.payload.uniqueId;
      });
    },
    reset: (state) => {
      state = getInitialState();
    },
    reorder: (state, { payload }) => {
      const getIndexByUniqueId = (uniqueId) =>
        state.ingredients.findIndex((ingredient) => ingredient.uniqueId === uniqueId);

      const fromIndex = getIndexByUniqueId(payload.from.uniqueId);
      const toIndex = getIndexByUniqueId(payload.to.uniqueId);

      const fromItem = state.ingredients.splice(fromIndex, 1)[0];
      state.ingredients.splice(toIndex, 0, fromItem);
    },
  },
});

export const burgerConstructorSelectors = {
  bun: (state) => state.burgerConstructor.bun,
  ingredients: (state) => state.burgerConstructor.ingredients,
  sum: ({ burgerConstructor }) => {
    const { ingredients, bun } = burgerConstructor;

    const ingredientsSum = ingredients.reduce((acc, ingredient) => {
      return acc + ingredient.price;
    }, 0);

    const bunsSum = bun ? bun.price * 2 : 0;

    return ingredientsSum + bunsSum;
  },
  orderIds: ({ burgerConstructor }) => {
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