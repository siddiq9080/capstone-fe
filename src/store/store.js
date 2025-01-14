import { configureStore } from "@reduxjs/toolkit";
import companiesReducer from "../Slices/companiesSlice";
import productsReducer from "../Slices/productsSlice";
import authReducer from "../Slices/authSlice";
import cartReducer from "../Slices/cartSlice";
import orderReducer from "../Slices/orderSlice";
import productReducer from "../Slices/poductSlice";
import userReducer from "../Slices/userSlice";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: {
    companiesState: companiesReducer,
    productsState: productsReducer,
    authState: authReducer,
    cartState: cartReducer,
    orderState: orderReducer,
    productState: productReducer,
    userState: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: true,
});

export default store;
