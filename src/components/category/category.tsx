import { CategoryItem } from "../category-item/category-item";
import styles from "./category.module.css";
import cn from "classnames";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { IngredientType, IngredientWithUid } from '../../types/ingredient';

interface ICategory {
  title: string;
  id: IngredientType;
  ingredients: IngredientWithUid[];
  headerRef: React.RefObject<HTMLHeadingElement>;
}


export const Category: FC<ICategory> = ({ title, id, ingredients, headerRef }) => {
  const navigate = useNavigate();

  const onClick = (data: IngredientWithUid) => {
    navigate(`/ingredients/${data._id}`, { state: { ingredientModal: true } });
  };

  return (
    <>
      <h2 className="text text_type_main-medium pb-6" id={id} ref={headerRef}>
        {title}
      </h2>
      <div className={cn(styles.list, "mb-10 pl-4 pr-4")}>
        {ingredients?.map((data) => (
          <CategoryItem
            key={data._id}
            data={data}
            setIngredientWindow={() => onClick(data)}
          />
        ))}
      </div>
    </>
  );
};


export default Category;
