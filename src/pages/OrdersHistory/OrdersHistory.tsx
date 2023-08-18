import { FC } from 'react';
import { OrderFeedElement } from '../../components/order-feed-element/order-feed-element';
import { ProfileNav } from '../../components/profile-nav/profile-nav';
import { useWsOrders } from '../../hooks/ws-orders';
import styles from './OrdersHistory.module.css';
import cn from 'classnames';

export const OrdersHistoryPage: FC = () => {
  const { orders } = useWsOrders();

  return (
    <div className={cn(styles.root, "pt-30")}>
      <ProfileNav />
      <div className={cn(styles.orders, "custom-scroll")}>
        {orders?.map((order) => <OrderFeedElement
          key={order.number}
          order={order}
          linkState={{ orderModal: true }}
          to={"/profile/orders/" + order.number}
        />)}
      </div>
    </div>
  );
};

export default OrdersHistoryPage;
