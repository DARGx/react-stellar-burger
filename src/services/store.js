import {
  configureStore,
  combineReducers
} from "@reduxjs/toolkit";
import ingredientsReducer from "./reducers/ingredients";
import burgerConstructorReducer from "./reducers/burger-constructor";
import currentIngredientReducer from "./reducers/current-ingredient";
import createdOrderReducer from "./reducers/created-order";
import authReducer from "./reducers/auth";

export const store = configureStore({
  reducer: combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    currentIngredient: currentIngredientReducer,
    createdOrder: createdOrderReducer,
    auth: authReducer,
  }),
})

export default store;