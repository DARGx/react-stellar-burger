import { useAppSelector } from '../services/store';
import { IngredientWithUid } from '../types/ingredient';

export const useIngredients = () => {
  const { data } = useAppSelector((state) => state.ingredients);

  return {
    ingredients: data,
    getById: (id: IngredientWithUid['_id']) => data.find((item) => item._id === id)!,
  };
};