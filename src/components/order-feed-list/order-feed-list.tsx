import React, { FC } from 'react';
import { OrderFeedElement } from '../order-feed-element/order-feed-element';
import { useAppSelector } from '../../services/store';
import styles from './order-feed-list.module.css';
import cn from 'classnames';

export const OrderFeedList: FC = () => {
  const data = useAppSelector((state) => state.feed.data);
  const orders = data?.orders || [];

  return (
    <section className={styles.container}>
      <h2 className="text text_type_main-large mb-5">Лента заказов</h2>
      <div className={cn(styles.list, "custom-scroll")}>
        {orders.map((order) => (
          <OrderFeedElement
            key={order._id}
            to={"/feed/" + order.number}
            linkState={{ feedModal: true }}
            order={order}
          />
        ))}
      </div>
    </section>
  );
};

export default OrderFeedList;
