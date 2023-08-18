import {
  ActionCreatorWithOptionalPayload,
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  Middleware,
} from '@reduxjs/toolkit';
import { TOrderList } from '../reducers/orders-page/reducer';
import { AppState } from '../store';

export type wsPayloadConnect = {
  wsUrl: string;
  withTokenRefresh: boolean;
};

type TWsActions = {
  wsConnect: ActionCreatorWithPayload<wsPayloadConnect>;
  wsDisconnect: ActionCreatorWithoutPayload;
  wsConnecting: ActionCreatorWithoutPayload;
  wsOpen: ActionCreatorWithoutPayload;
  wsClose: ActionCreatorWithoutPayload;
  wsError: ActionCreatorWithOptionalPayload<string | undefined>;
  wsMessage: ActionCreatorWithPayload<TOrderList>;
};

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;
    let reconnectTimer: number = 0;
    let isConnected: boolean = false;
    let wsUrl: string = "";
    let withTokenRefresh: boolean = false;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const state: AppState = getState();
      const {
        wsConnect,
        wsDisconnect,
        wsConnecting,
        wsOpen,
        wsClose,
        wsError,
        wsMessage,
      } = wsActions;

      if (wsConnect.match(action)) {
        wsUrl = action.payload.wsUrl;
        withTokenRefresh = action.payload.withTokenRefresh;

        const clearToken = state.auth.accessToken.replace('Bearer ', '');

        socket = new WebSocket(`${wsUrl}?token=${clearToken}`);
        isConnected = true;
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch(wsOpen());
        };

        socket.onerror = (event) => {
          console.error("socket.onerror", event);
        };

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            dispatch(wsError(event.code.toString()));
          }

          if (isConnected && event.code !== 1000) {
            reconnectTimer = window.setTimeout(() => {
              dispatch(
                wsConnect({
                  wsUrl,
                  withTokenRefresh,
                })
              );
            }, 3000);
          }
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(wsMessage(parsedData));
        };
      }

      if (wsDisconnect.match(action) && socket) {
        clearTimeout(reconnectTimer);
        isConnected = false;
        reconnectTimer = 0;
        socket.close(1000, "Работа закончена");

        dispatch(wsClose());
      }

      next(action);
    };
  };
};
