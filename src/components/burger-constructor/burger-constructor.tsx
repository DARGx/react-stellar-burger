import { FC, useState } from 'react';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { useDrop } from 'react-dnd';
import { burgerConstructorActions, burgerConstructorSelectors } from '../../services/reducers/burger-constructor';
import { createOrder } from '../../services/reducers/created-order';
import { BurgerConstructorItem } from '../burger-constructor-item/burger-constructor-item';
import { useAuth } from '../../hooks/auth';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../services/reducers/auth';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { Ingredient, IngredientType, IngredientWithUid } from '../../types/ingredient';
import styles from './burger-constructor.module.css';
import cn from 'classnames';

export const BurgerConstructor: FC = () => {
  const bun = useAppSelector(burgerConstructorSelectors.bun);
  const ingredients = useAppSelector(burgerConstructorSelectors.ingredients);
  const sum = useAppSelector(burgerConstructorSelectors.sum);
  const orderIds = useAppSelector(burgerConstructorSelectors.orderIds);
  const { data: orderData, isLoading: isOrderLoading } = useAppSelector((state) => state.createdOrder);
  const { user } = useAuth();
  const navigate = useNavigate();

  const isEmpty = !bun && ingredients.length === 0;
  const dispatch = useAppDispatch();

  const [isShowOrderModal, setIsShowOrderModal] = useState(false);

  const handleOrderClick = async () => {
    if (user) {
      const res = await dispatch(
        createOrder({
          ingredients: orderIds,
        }),
      );
  
      if (res.meta.requestStatus === 'fulfilled') {
        setIsShowOrderModal(true);
        dispatch(burgerConstructorActions.reset());
      } else {
        console.error(res);
      }
    } else {
      dispatch(authActions.setReturnUrl('/'));
      navigate('/login');
    }
  };
  const [, drop] = useDrop<Ingredient>(() => ({
    accept: 'ingredient',
    drop: (item) => {
      if (item.type === IngredientType.BUN) {
        dispatch(burgerConstructorActions.addBun(item));
      } else {
        dispatch(burgerConstructorActions.addIngredient(item));
      }
    },
  }));

  const modalJsx = isShowOrderModal && (
    <Modal title="" onClose={() => setIsShowOrderModal(false)}>
      <OrderDetails data={orderData!} />
    </Modal>
  );

  if (isEmpty) {
    return (
      <>
        <div id='empty' ref={drop} className={cn(styles.empty, "text text_type_main-medium")}>Выберите ингредиенты по вкусу<br/>и обязательно добавьте булку!</div>
        { modalJsx }
      </>
    );
  }

  const onDelete = (data: IngredientWithUid) => {
    dispatch(burgerConstructorActions.removeIngredient(data));
  };

  return (
    <section id='container' ref={drop} className={styles.wrapper}>
      <div className='ml-6 mb-4'>
        {!!bun && (
          <ConstructorElement text={bun.name + ' (верх)'} price={bun.price} thumbnail={bun.image} type='top' isLocked={true} />
        )}
      </div>

      <div id='container' className={cn(styles.container, 'custom-scroll')}>
        {ingredients.length === 0 && <div className={cn(styles.empty, "text text_type_main-medium")}>Добавьте ингредиенты</div>}
        {ingredients.map((data, index) => {
          const lastBun = ingredients.length - 1 === index;

          return <BurgerConstructorItem key={data.uniqueId} data={data} lastBun={lastBun} onDelete={onDelete} />;
        })}
      </div>
      <div className='ml-6 mt-4'>
        {!!bun && (
          <ConstructorElement text={bun.name + ' (низ)'} price={bun.price} thumbnail={bun.image} type='bottom' isLocked={true} />
        )}
      </div>

      <div className={cn(styles.order_sum)}>
        <div className={styles.order_container}>
          <p className='text text_type_digits-medium mr-2'>{sum}</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button
          htmlType='button'
          type='primary'
          size='large'
          onClick={handleOrderClick}
          disabled={bun == null}
          extraClass={cn({ [styles.loading]: isOrderLoading } )}
        >
          {isOrderLoading ? 'Загрузка...' : 'Оформить заказ' }
        </Button>
      </div>
      { modalJsx }
    </section>
  );
};

export default BurgerConstructor;
