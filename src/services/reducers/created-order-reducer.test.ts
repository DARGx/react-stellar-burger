import { slice, getInitialState, createOrder } from "./created-order";

describe("created order reducer", () => {
  it("initial state", () => {
    expect(slice.reducer(undefined, { type: "" })).toEqual(getInitialState());
  });

  it("createOrder.fulfilled", () => {
    const res = {
      name: "Заказ",
      order: {
        number: 10,
      },
      success: true,
    };
    const action = createOrder.fulfilled(res, "createdOrder/fetch/fulfilled", {
      ingredients: ["id1", "id2", "id3"],
    });
    const nextState = slice.reducer(undefined, action);
    expect(nextState).toMatchObject({
      data: res,
      isLoading: false,
      error: null,
    });
  });

  it("createOrder.pending", () => {
    const action = createOrder.pending("createdOrder/fetch/pending", {
      ingredients: ["id1", "id2", "id3"],
    });
    const nextState = slice.reducer(undefined, action);
    expect(nextState).toMatchObject({
      data: null,
      isLoading: true,
      error: null,
    });
  });

  it("createOrder.rejected", () => {
    const error = new Error("smth");

    const action = createOrder.rejected(
      error,
      "createdOrder/fetch/rejected",
      {
        ingredients: ["id1"],
      },
      error
    );
    const nextState = slice.reducer(undefined, action);
    expect(nextState).toMatchObject({
      isLoading: false,
      error: error.message,
    });
  });
});
