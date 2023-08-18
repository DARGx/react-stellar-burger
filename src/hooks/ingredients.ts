import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchIngredients } from '../services/reducers/ingredients'
import { AppState, useAppDispatch } from '../services/store';
import { IngredientWithUid } from '../types/ingredient';

export const useIngredients = () => {
  const dispatch = useAppDispatch();
  const { data, isLoaded }: { data: IngredientWithUid[], isLoaded: boolean } = useSelector((state: AppState) => state.ingredients);

  useEffect(() => {
    if (!isLoaded) {
      dispatch(fetchIngredients()); 
    }
  }, [dispatch, isLoaded]);

  return {
    ingredients: data,
    getById: (id: IngredientWithUid['_id']) => data.find((item) => item._id === id),
  };
};