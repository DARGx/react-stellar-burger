import { useDrag } from 'react-dnd';
import { BurgerIngredient } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { burgerConstructorSelectors } from '../../services/reducers/burger-constructor';
import styles from './category-item.module.css';
import { FC } from 'react';
import { IngredientWithUid } from '../../types/ingredient';

interface CategoryItemProps {
  data: IngredientWithUid;
  setIngredientWindow: (data: IngredientWithUid) => void;
}

export const CategoryItem: FC<CategoryItemProps> = ({ data, setIngredientWindow }) => {
  const [dragState, drag] = useDrag({
    type: 'ingredient',
    item: data,
  });

  const ingredients = useSelector(burgerConstructorSelectors.ingredients);
  const bun = useSelector(burgerConstructorSelectors.bun);

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