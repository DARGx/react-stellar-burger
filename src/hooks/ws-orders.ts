import { useEffect } from 'react';
import { wsConnectOrder, wsDisconnectOrder } from '../services/reducers/orders-page/action';
import { useAppDispatch, useAppSelector } from '../services/store';
import { BASE_URL } from '../utils/ws';

export const useWsOrders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders.data?.orders) || [];

  useEffect(() => {
    dispatch(
      wsConnectOrder({
        wsUrl: BASE_URL + "/orders",
        withTokenRefresh: true,
      })
    );

    return () => {
      dispatch(wsDisconnectOrder());
    };
  }, [dispatch]);

  return { orders };
};