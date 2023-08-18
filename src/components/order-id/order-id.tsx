import { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { formatOrderDate } from '../../utils/date';
import { Order } from '../../types/order';
import { useOrderSum } from '../../hooks/order-sum';
import { getOrderStatus } from '../../utils/order';
import { useOrderIngredientsGrouped } from '../../hooks/order-ingredients';
import styles from './order-id.module.css';
import cn from 'classnames';

interface OrderIdProps {
  order: Order;
}

export const OrderId: FC<OrderIdProps> = ({ order }) => {
  const sum = useOrderSum(order);
  const orderDate = formatOrderDate(order.createdAt);
  const orderIngredients = useOrderIngredientsGrouped(order);

  return (
    <div className={styles.order}>
      {/* <p className={'text text_type_digits-default'}>#{order.number}</p> */}
      <h2 className={cn(styles.title, "text text_type_main-medium mt-10")}>
        {order.name}
      </h2>
      <p className={cn(styles.status, "text text_type_main-default mt-3")}>
        {getOrderStatus(order)}
      </p>
      <h3 className={cn(styles.title, "text text_type_main-medium mt-15")}>
        Состав:
      </h3>
      <ul className={cn(styles.list, "custom-scroll")}>
        {orderIngredients.map((ingredient, index) => {
          return (
            <li key={ingredient._id + index} className={styles.item}>
              <div className={styles.image_container}>
                <img
                  className={styles.image}
                  src={ingredient.image}
                  alt=""
                />
                <p className={cn(styles.text, "text_type_main-default")}>
                  {ingredient.name}
                </p>
              </div>
              <p className={cn(styles.price, "text text_type_digits-default")}>
                {ingredient.count} x {ingredient.price}
                <CurrencyIcon type="primary" />
              </p>
            </li>
          );
        })}
      </ul>

      <div className={cn(styles.total, "mt-10")}>
        <p className={"text text_type_main-default text_color_inactive"}>
          {orderDate}
        </p>
        <div className={cn(styles.total_price, "mt-1 mb-2")}>
          <p className="text text_type_digits-default">{sum}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderId;
