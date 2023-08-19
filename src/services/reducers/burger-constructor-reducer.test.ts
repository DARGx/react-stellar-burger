import {
  Ingredient,
  IngredientType,
  IngredientWithUid,
} from "../../types/ingredient";
import { AppState } from "../store";
import reducer, {
  burgerConstructorSelectors,
  getInitialState,
  slice,
} from "./burger-constructor";

const bun: Ingredient = {
  _id: "643d69a5c3f7b9001cfa093c",
  name: "Краторная булка N-200i",
  type: IngredientType.BUN,
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
};

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

describe("burger constructor reducer", () => {
  it("initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(getInitialState());
  });

  it("addBun action", () => {
    const action = slice.actions.addBun(bun);
    const nextState = reducer(undefined, action);
    expect(nextState).toMatchObject({
      bun,
    });
  });

  it("addIngredient action", () => {
    const action = slice.actions.addIngredient(bun);
    const nextState = reducer(undefined, action);

    expect(nextState).toMatchObject({
      ingredients: [
        {
          ...bun,
          uniqueId: expect.stringMatching(""),
        },
      ],
    });
  });

  it("addIngredient action x2", () => {
    const action = slice.actions.addIngredient(bun);
    const state1 = reducer(undefined, action);
    const state2 = reducer(state1, action);

    expect(state2.ingredients).toHaveLength(2);
    expect(state2.ingredients[0].uniqueId).not.toEqual(
      state2.ingredients[1].uniqueId
    );
  });

  it("removeIngredient action", () => {
    const ingredientWithId: IngredientWithUid = { ...bun, uniqueId: "myid" };

    const action = slice.actions.removeIngredient(ingredientWithId);
    const prevState = {
      ...getInitialState(),
      ingredients: [ingredientWithId],
    };
    const nextState = reducer(prevState, action);

    expect(nextState.ingredients).toEqual([]);
  });

  it("reset action", () => {
    const ingredientWithId: IngredientWithUid = { ...bun, uniqueId: "myid" };

    const action = slice.actions.reset();
    const prevState = {
      bun: ingredientWithId,
      ingredients: [ingredientWithId],
    };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual(getInitialState());
  });

  it("reorder action", () => {
    const ingredient1: IngredientWithUid = { ...ingredient, uniqueId: "id1" };
    const ingredient2: IngredientWithUid = { ...ingredient, uniqueId: "id2" };
    const ingredient3: IngredientWithUid = { ...ingredient, uniqueId: "id3" };

    const action = slice.actions.reorder({
      from: ingredient3,
      to: ingredient1,
    });

    const prevState = {
      ...getInitialState(),
      ingredients: [ingredient1, ingredient2, ingredient3],
    };
    const nextState = reducer(prevState, action);

    expect(nextState.ingredients).toEqual([
      ingredient3,
      ingredient1,
      ingredient2,
    ]);
  });
});

describe("burger constructor selectors", () => {
  it("sum", () => {
    const ingredient1: IngredientWithUid = { ...ingredient, uniqueId: "id1" };
    const ingredient2: IngredientWithUid = { ...ingredient, uniqueId: "id2" };
    const ingredient3: IngredientWithUid = { ...ingredient, uniqueId: "id3" };

    const result = burgerConstructorSelectors.sum({
      burgerConstructor: {
        bun,
        ingredients: [ingredient1, ingredient2, ingredient3],
      },
    } as AppState);

    expect(result).toEqual(3782);
  });

  it("orderIds", () => {
    const ingredient1: IngredientWithUid = { ...ingredient, uniqueId: "id1" };
    const ingredient2: IngredientWithUid = { ...ingredient, uniqueId: "id2" };
    const ingredient3: IngredientWithUid = { ...ingredient, uniqueId: "id3" };

    const result = burgerConstructorSelectors.orderIds({
      burgerConstructor: {
        bun,
        ingredients: [ingredient1, ingredient2, ingredient3],
      },
    } as AppState);

    expect(result).toEqual([
      bun._id,
      ingredient1._id,
      ingredient2._id,
      ingredient3._id,
    ]);
  });
});
