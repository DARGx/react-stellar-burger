import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Modal } from '../../components/modal/modal';
import OrderId from '../../components/order-id/order-id';
import { useAppSelector } from '../../services/store';

export const OrderModalPage: FC = () => {
  const params = useParams();
  const orders = useAppSelector((state) => state.orders.data?.orders);
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
