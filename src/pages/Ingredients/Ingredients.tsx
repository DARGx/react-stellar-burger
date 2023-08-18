import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { IngredientDetails } from '../../components/ingredient-details/ingredient-details';
import { useIngredients } from '../../hooks/ingredients';

export const IngredientsPage: FC = () => {
  const params = useParams();
  const { getById } = useIngredients();
  const ingredient = getById(params.id!);

  return <>{!!ingredient && <IngredientDetails data={ingredient} />}</>;
};
