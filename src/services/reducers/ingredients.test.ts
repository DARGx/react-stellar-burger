import { Ingredient, IngredientType } from "../../types/ingredient";
import { RequestStatus } from "../../utils/request-status";
import {
  slice,
  getInitialState,
  fetchIngredients,
  ingredientsSelectors,
} from "./ingredients";

const ingredient: Ingredient = {
  _id: "643d69a5c3f7b9001cfa0941",
  name: "Биокотлета из марсианской Магнолии",
  type: IngredientType.MAIN,
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: "https://code.s3.yandex.net/react/code/meat-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
  __v: 0,
};

describe("ingredients reducer", () => {
  it("initial state", () => {
    expect(slice.reducer(undefined, { type: "" })).toEqual(getInitialState());
  });

  it("fetchIngredients.pending", () => {
    const action = fetchIngredients.pending(
      fetchIngredients.typePrefix + "/pending"
    );
    expect(slice.reducer(undefined, action)).toMatchObject({
      status: RequestStatus.PENDING,
      error: null,
    });
  });

  it("fetchIngredients.fulfilled", () => {
    const action = fetchIngredients.fulfilled(
      [ingredient],
      fetchIngredients.typePrefix + "/fulfilled"
    );

    expect(slice.reducer(undefined, action)).toMatchObject({
      status: RequestStatus.SUCCESS,
      error: null,
      data: [ingredient],
    });
  });

  it("fetchIngredients.rejected", () => {
    const error = new Error("Something message");

    const action = fetchIngredients.rejected(
      null,
      fetchIngredients.typePrefix + "/rejected",
      undefined,
      error
    );

    expect(slice.reducer(undefined, action)).toMatchObject({
      status: RequestStatus.ERROR,
      error: error.message,
    });
  });
});

describe("ingredients selectors", () => {
  it("byId", () => {
    const ingredient1 = { ...ingredient, _id: "id1" };
    const ingredient2 = { ...ingredient, _id: "id2" };

    const state = { ...getInitialState(), data: [ingredient1, ingredient2] };

    const result = ingredientsSelectors.byId("id2")({ ingredients: state });

    expect(result).toEqual(ingredient2);
  });
});
