import {
  configureStore,
  combineReducers
} from "@reduxjs/toolkit";
import ingredientsReducer from "./reducers/ingredients";
import burgerConstructorReducer from "./reducers/burger-constructor";
import currentIngredientReducer from "./reducers/current-ingredient";
import createdOrderReducer from "./reducers/created-order";
import authReducer from "./reducers/auth";
import { useDispatch } from 'react-redux';

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

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch() as AppDispatch;
