import { Ingredient, IngredientType } from '../types/ingredient';

export const getIngredientsSum = (ingredients: Ingredient[]): number => {
  return ingredients.reduce((acc, ingredient) => {
    if (ingredient.type === IngredientType.BUN) {
      acc += ingredient.price * 2;
    } else {
      acc += ingredient.price;
    }
    return acc;
  }, 0);
};