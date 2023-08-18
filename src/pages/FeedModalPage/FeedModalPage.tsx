import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Modal } from '../../components/modal/modal';
import { useAppSelector } from '../../services/store';
import OrderId from '../../components/order-id/order-id';

export const FeedModalPage: FC = () => {
  const params = useParams();
  const orders = useAppSelector((state) => state.feed.data?.orders);
  const id = parseInt(params.id || '');
  const order = orders?.find((order) => order.number === id);

  if (!order) {
    return null;
  }

  return (
    <Modal title={'#' + order.number} onClose={() => window.history.back()}>
      <div className={'pl-10 pb-10 pr-10'}>
        <OrderId order={order} />
      </div>
    </Modal>
  );
};
