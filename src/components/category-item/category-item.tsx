import { FC } from 'react';
import { useDrag } from 'react-dnd';
import { BurgerIngredient } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../services/store';
import { burgerConstructorSelectors } from '../../services/reducers/burger-constructor';
import { Ingredient } from '../../types/ingredient';
import styles from './category-item.module.css';

interface CategoryItemProps {
  data: Ingredient;
  setIngredientWindow: (data: Ingredient) => void;
}

export const CategoryItem: FC<CategoryItemProps> = ({ data, setIngredientWindow }) => {
  const [, drag] = useDrag({
    type: 'ingredient',
    item: data,
  });

  const ingredients = useAppSelector(burgerConstructorSelectors.ingredients);
  const bun = useAppSelector(burgerConstructorSelectors.bun);

  const getBunCount = () => bun?._id === data._id ? 2 : 0;
  const getIngredientCount = () => ingredients.filter((ingredient) => ingredient._id === data._id).length;

  const count = data.type === 'bun' ? getBunCount() : getIngredientCount();

  return <div ref={drag}>
    <BurgerIngredient
      {...data}
      className={count === 0 ? styles.zero : ''} // Решение следующей проблемы: в компоненте ингридиента из библиотеки при передаче нуля Count, 0 рендерится, как текст в JSX разметке.
      count={count || -1} //  По всей видимости ошибка в самом компоненте в библиотеке. Потому присваиваем свой кастомный класс для скрытия счетчика в дефолтном состоянии.
      onClick={() => setIngredientWindow(data)} />
  </div>
}

export default CategoryItem;