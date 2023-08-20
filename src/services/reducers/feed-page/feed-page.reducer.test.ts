import { feedReducer } from './reducer';
import {
  wsConnectingFeed,
  wsErrorFeed,
  wsMessageFeed,
} from './action';

describe('feedReducer', () => {
  const initialState = {
    data: null,
  };

  it('should handle wsConnectingFeed', () => {
    const action = wsConnectingFeed();
    const state = feedReducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('should handle wsErrorFeed', () => {
    const errorMessage = 'An error occurred';
    const action = wsErrorFeed(errorMessage);
    const state = feedReducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('should handle wsMessageFeed', () => {
    const orderList = {
      success: true,
      orders: [],
      total: 0,
      totalToday: 0,
    };
    const action = wsMessageFeed(orderList);
    const state = feedReducer(initialState, action);
    const expectedState = {
      data: orderList,
    };
    expect(state).toEqual(expectedState);
  });
});
