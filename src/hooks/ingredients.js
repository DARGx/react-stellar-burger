import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from '../services/reducers/ingredients'

export const useIngredients = () => {
  const dispatch = useDispatch();
  const { data, isLoaded } = useSelector((state) => state.ingredients);

  useEffect(() => {
    if (!isLoaded) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, isLoaded]);

  return {
    ingredients: data,
    getById: (id) => data.find((item) => item._id === id),
  };
};