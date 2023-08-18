import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { OrderId } from '../../components/order-id/order-id';
import { useWsFeed } from '../../hooks/ws-feed';
import { getOrderByNumber } from '../../utils/order';
import styles from './FeedDetail.module.css';

export const FeedDetailPage: FC = () => {
  const { orders } = useWsFeed();
  const params = useParams();
  const id = parseInt(params.id || "");
  const order = getOrderByNumber(orders, id)

  if (!order) {
    return null;
  }

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <p className={"text text_type_digits-default"}>#{order.number}</p>
        <OrderId order={order} />
      </div>
    </div>
  );
};
