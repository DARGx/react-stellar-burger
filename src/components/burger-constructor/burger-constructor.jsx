import React from 'react';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { useDrop } from 'react-dnd';
import { burgerConstructorActions, burgerConstructorSelectors } from '../../services/reducers/burger-constructor';
import { createOrder, createOrderSelectors } from '../../services/reducers/created-order';
import { useDispatch, useSelector } from 'react-redux';
import { BurgerConstructorItem } from '../burger-constructor-item/burger-constructor-item';
import styles from './burger-constructor.module.css';
import cn from 'classnames';

export const BurgerConstructor = () => {
  const bun = useSelector(burgerConstructorSelectors.bun);
  const ingredients = useSelector(burgerConstructorSelectors.ingredients);
  const sum = useSelector(burgerConstructorSelectors.sum);
  const orderIds = useSelector(burgerConstructorSelectors.orderIds);
  const orderData = useSelector(createOrderSelectors.data);

  const isEmpty = !bun && ingredients.length === 0;
  const dispatch = useDispatch();

  const [isShowOrderModal, setIsShowOrderModal] = React.useState(false);

  const handleOrderClick = async () => {
    const res = await dispatch(
      createOrder({
        ingredients: orderIds,
      }),
    );

    if (res.meta.requestStatus === 'fulfilled') {
      setIsShowOrderModal(true);
    } else {
      console.error(res);
    }
  };
  const [dropState, drop] = useDrop(() => ({
    accept: 'ingredient',
    drop: (item) => {

      if (item.type === 'bun') {
        dispatch(burgerConstructorActions.addBun(item));
      } else {
        dispatch(burgerConstructorActions.addIngredient(item));
      }
    },
  }));

  if (isEmpty) {
    return (
      <div ref={drop} className={cn(styles.empty, "text text_type_main-medium")}>Добавьте булку и ингредиенты</div>
    );
  }

  const onDelete = (data) => {
    dispatch(burgerConstructorActions.removeIngredient(data));
  };

  return (
    <section ref={drop} className={styles.wrapper}>
      <div className='ml-6 mb-4'>
        {!!bun && (
          <ConstructorElement text={bun.name} price={bun.price} thumbnail={bun.image} type='top' isLocked={true} />
        )}
      </div>

      <div className={cn(styles.container, 'custom-scroll')}>
        {ingredients.length === 0 && <div className={cn(styles.empty, "text text_type_main-medium")}>Добавьте ингредиенты</div>}
        {ingredients.map((data, index) => {
          const lastBun = ingredients.length - 1 === index;

          return <BurgerConstructorItem key={data.uniqueId} data={data} lastBun={lastBun} onDelete={onDelete} />;
        })}
      </div>
      <div className='ml-6 mt-4'>
        {!!bun && (
          <ConstructorElement text={bun.name} price={bun.price} thumbnail={bun.image} type='bottom' isLocked={true} />
        )}
      </div>

      <div className={cn(styles.order_sum)}>
        <div className={styles.order_container}>
          <p className='text text_type_digits-medium mr-2'>{sum}</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button htmlType='button' type='primary' size='large' onClick={handleOrderClick}>
          Оформить заказ
        </Button>
      </div>
      {isShowOrderModal && (
        <Modal onClose={() => setIsShowOrderModal(false)}>
          <OrderDetails data={orderData} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
