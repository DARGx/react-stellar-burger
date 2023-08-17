import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { burgerConstructorActions } from '../../services/reducers/burger-constructor';
import styles from './burger-constructor-item.module.css';
import cn from 'classnames';
import { FC } from 'react'
import { IngredientWithUid } from '../../types/ingredient';

interface IBurgerConstructor {
  data: IngredientWithUid
  lastBun?: boolean;
  onDelete: (data: IngredientWithUid) => void;
}

export const BurgerConstructorItem: FC<IBurgerConstructor> = ({ data, lastBun, onDelete }) => {
  const dispatch = useDispatch();

  const [dragState, drag] = useDrag({
    type: 'ingredient-list',
    item: data,
  });
  const [dropState, drop] = useDrop<IngredientWithUid>(() => ({
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