import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  products: [],
  product: {},
  isProductCreated: false,
  isProductDeleted: false,
  isProductUpdated: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    productsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload.products;
    },
    productsFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    productRequest(state) {
      state.loading = true;
      state.error = null;
    },
    productSuccess(state, action) {
      state.loading = false;
      state.product = action.payload.product;
    },
    productFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    adminProductsRequest(state, action) {
      return {
        loading: true,
      };
    },
    adminProductsSuccess(state, action) {
      return {
        loading: false,
        products: action.payload.products,
      };
    },
    adminProductsFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

export const {
  productsRequest,
  productsSuccess,
  productsFail,
  productRequest,
  productSuccess,
  productFail,
  adminProductsRequest,
  adminProductsFail,
  adminProductsSuccess,
} = productsSlice.actions;
export default productsSlice.reducer;
