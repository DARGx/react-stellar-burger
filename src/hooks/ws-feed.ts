import { useEffect } from 'react';
import { wsConnectFeed, wsDisconnectFeed } from '../services/reducers/feed-page/action';
import { useAppDispatch, useAppSelector } from '../services/store';
import { BASE_URL } from '../utils/ws';

export const useWsFeed = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.feed.data?.orders) || [];

  useEffect(() => {
    dispatch(
      wsConnectFeed({
        wsUrl: BASE_URL + "/orders/all",
        withTokenRefresh: true,
      })
    );

    return () => {
      dispatch(wsDisconnectFeed());
    };
  }, [dispatch]);

  return { orders };
};