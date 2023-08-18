import { Ingredient, IngredientType } from '../types/ingredient';
import { Order } from '../types/order';
import { useIngredients } from './ingredients';

export const useOrderIngredients = (order: Order) => {
  const { getById } = useIngredients();

  const orderIngredients = order.ingredients
    .map((id) => getById(id))
    .filter(Boolean);

  return orderIngredients;
}

export type GroupedIngredient = Ingredient & { count: number };

export const useOrderIngredientsGrouped = (order: Order) => {
  const ingredients = useOrderIngredients(order);

  const map: Record<string, GroupedIngredient> = {};

  ingredients.forEach((ingredient) => {
    if (map[ingredient._id]) {
      map[ingredient._id].count += 1;
    } else {
      const count = ingredient.type === IngredientType.BUN ? 2 : 1;
      map[ingredient._id] = { ...ingredient, count };
    }
  })

  return Object.values(map);
}