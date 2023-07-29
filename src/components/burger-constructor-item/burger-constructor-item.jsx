import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { burgerConstructorActions } from '../../services/reducers/burger-constructor';
import PropTypes from 'prop-types';
import ingredientPropTypes from '../../utils/prop-types';
import styles from './burger-constructor-item.module.css';
import cn from 'classnames';

export const BurgerConstructorItem = ({ data, lastBun, onDelete }) => {
  const dispatch = useDispatch();

  const [dragState, drag] = useDrag({
    type: 'ingredient-list',
    item: data,
  });
  const [dropState, drop] = useDrop(() => ({
    accept: 'ingredient-list',
    item: data,
    drop: (item, ...args) => {
      dispatch(burgerConstructorActions.reorder({ from: item, to: data }));
    },
  }));

  return (
    <div ref={drag}>
      <div ref={drop} className={cn(styles.element_item, lastBun ? '' : 'mb-4')}>
        <DragIcon />
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

BurgerConstructorItem.propTypes = {
  data: ingredientPropTypes.isRequired,
  lastBun: PropTypes.bool,
  onDelete: PropTypes.func,
};