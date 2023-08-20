import currentIngredientReducer, {
  currentIngredientActions,
  getInitialState,
} from "./current-ingredient";

describe("currentIngredient reducer", () => {
  const testPayload = "test_payload";

  it("should return the initial state", () => {
    expect(currentIngredientReducer(undefined, { type: "" })).toEqual(
      getInitialState()
    );
  });

  it("should handle set action", () => {
    const action = currentIngredientActions.set(testPayload);
    expect(currentIngredientReducer(getInitialState(), action)).toEqual({
      data: testPayload,
    });
  });

  it("should handle unset action", () => {
    const action = currentIngredientActions.unset();
    expect(currentIngredientReducer(getInitialState(), action)).toEqual({
      data: null,
    });
  });

  it("should handle reset action", () => {
    const action = currentIngredientActions.reset(testPayload);
    expect(currentIngredientReducer(getInitialState(), action)).toEqual({
      data: testPayload,
    });
  });
});
