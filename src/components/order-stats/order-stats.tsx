import { FC } from 'react';
import { useAppSelector } from '../../services/store';
import styles from './order-stats.module.css';
import cn from 'classnames';
import { OrderStatus } from '../../types/order';

export const OrderStats: FC = () => {
  const data = useAppSelector((state) => state.feed.data);
  const { orders = [], total = 0, totalToday = 0 } = data || {};

  const doneOrders = orders
    .filter((order) => order.status === OrderStatus.DONE)
    .slice(0, 36);
  const pendingOrders = orders
    .filter((order) => order.status === OrderStatus.PENDING)
    .slice(0, 36);

  return (
    <section className={styles.container}>
      <div className={styles.orders}>
        <div className={cn(styles.done, "mr-9")}>
          <h2 className={"text text_type_main-medium"}>Готовы:</h2>
          <ul className={styles.list}>
            {doneOrders.map((doneOrder) => (
              <li
                key={doneOrder._id}
                className={cn("text text_type_digits-default")}
              >
                {doneOrder.number}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.working}>
          <h2 className={"text text_type_main-medium"}>В работе:</h2>
          <ul className={styles.list}>
            {pendingOrders.map((order) => (
              <li
                key={order._id}
                className={cn("text text_type_digits-default")}
              >
                {order.number}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.overall}>
        <li className={"text text_type_main-medium"}>
          Выполнено за все время:
        </li>
        <li className={cn(styles.shadow, "text text_type_digits-large")}>
          {total}
        </li>
      </div>
      <div className={styles.overall}>
        <li className={"text text_type_main-medium"}>Выполнено за сегодня:</li>
        <li className={cn(styles.shadow, "text text_type_digits-large")}>
          {totalToday}
        </li>
      </div>
    </section>
  );
};

export default OrderStats;
