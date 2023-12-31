import { FC } from 'react';
import { Ingredient } from '../../types/ingredient';
import styles from './ingredient-details.module.css';
import cn from 'classnames';

interface IngredientDetailsProp {
  data: Ingredient;
}

export const IngredientDetails: FC<IngredientDetailsProp> = ({ data }) => {
  const items = [
    {
      label: 'Калории,ккал',
      value: data.calories,
    },
    {
      label: 'Белки,г',
      value: data.proteins,
    },
    {
      label: 'Жиры,г',
      value: data.fat,
    },
    {
      label: 'Углеводы,г',
      value: data.carbohydrates,
    },
  ];

  return (
    <section>
      <div className={cn(styles.image_wrapper, 'pb-4')}>
        <img src={data.image_large} alt="Изображение ингредиента" />
      </div>
      <h3 className={cn(styles.title, 'text text_type_main-medium pb-8')}>{data.name}</h3>
      <div className={cn(styles.details_container, "pb-15")}>
        {items.map((item) => {

          return (
            <div className={cn(styles.details_element)} key={item.label}>
              <p className="text text_type_main-default text_color_inactive mb-">{item.label}</p>
              <p className="text text_type_digits-default text_color_inactive">{item.value}</p>
            </div>)
        })}
      </div>
    </section>
  )
}

export default IngredientDetails;
