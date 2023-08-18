import { Order } from '../types/order';
import { getIngredientsSum } from '../utils/ingredients';
import { useOrderIngredients } from './order-ingredients';

export const useOrderSum = (order: Order) => {
  const orderIngredients = useOrderIngredients(order);

  const sum = getIngredientsSum(orderIngredients);

  return sum;
}