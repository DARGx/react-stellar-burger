import { FC } from "react";
import { useParams } from "react-router-dom";
import { Modal } from "../../components/modal/modal";
import { useIngredients } from "../../hooks/ingredients";
import { IngredientDetails } from "../../components/ingredient-details/ingredient-details";

export const IngredientModalPage: FC = () => {
  const params = useParams();
  const { getById } = useIngredients();
  const ingredient = getById(params.id!); 

  if (!ingredient) {
    return null;
  }

  return (
    <Modal title="Детали ингредиента" onClose={() => window.history.back()}>
      <IngredientDetails data={ingredient} />
    </Modal>
  );
};
