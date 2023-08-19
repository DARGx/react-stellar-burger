import { ordersReducer, TOrderState } from "./reducer";
import { wsMessageOrder } from "./action";
import { Order, OrderStatus } from "../../../types/order";

describe("ordersReducer", () => {
  let initialState: TOrderState;
  let order: Order;

  beforeEach(() => {
    initialState = {
      data: null,
    };

    order = {
      _id: "123",
      status: OrderStatus.CREATED,
      name: "Test order",
      createdAt: "2023-05-01T10:00:00.000Z",
      updatedAt: "2023-05-01T10:00:00.000Z",
      number: 1,
      ingredients: ["бургер", "булка", "соус"],
    };
  });

  it("should handle wsMessageOrder", () => {
    const newState = ordersReducer(initialState, wsMessageOrder({
      success: true,
      orders: [order],
      total: 1,
      totalToday: 1,
    }));

    expect(newState).toEqual({
      data: {
        success: true,
        orders: [order],
        total: 1,
        totalToday: 1,
      },
    });
  });
});