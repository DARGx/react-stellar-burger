import { FC } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { useAppDispatch } from '../../services/store';
import { burgerConstructorActions } from '../../services/reducers/burger-constructor';
import { IngredientWithUid } from '../../types/ingredient';
import styles from './burger-constructor-item.module.css';
import cn from 'classnames';

interface IBurgerConstructor {
  data: IngredientWithUid
  lastBun?: boolean;
  onDelete: (data: IngredientWithUid) => void;
}

export const BurgerConstructorItem: FC<IBurgerConstructor> = ({ data, lastBun, onDelete }) => {
  const dispatch = useAppDispatch();

  const [, drag] = useDrag({
    type: 'ingredient-list',
    item: data,
  });
  const [, drop] = useDrop<IngredientWithUid>(() => ({
    accept: 'ingredient-list',
    item: data,
    drop: (item) => {
      dispatch(burgerConstructorActions.reorder({ from: item, to: data }));
    },
  }));

  return (
    <div ref={drag}>
      <div ref={drop} className={cn(styles.element_item, lastBun ? '' : 'mb-4')}>
        <DragIcon type={'primary'} />
        <ConstructorElement
          text={data.name}
          price={data.price}
          thumbnail={data.image}
          handleClose={() => onDelete(data)}
        />
      </div>
    </div>
  );
};

export default BurgerConstructorItem;