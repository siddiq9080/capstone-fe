import axios from "axios";
import Cookies from "js-cookie";
import {
  adminOrdersFail,
  adminOrdersRequest,
  adminOrdersSuccess,
  createOrderFail,
  createOrderRequest,
  createOrderSuccess,
  deleteOrderFail,
  deleteOrderRequest,
  deleteOrderSuccess,
  orderDetailFail,
  orderDetailRequest,
  orderDetailSuccess,
  updateOrderFail,
  updateOrderRequest,
  updateOrderSuccess,
  userOrdersFail,
  userOrdersRequest,
  userOrdersSuccess,
} from "../Slices/orderSlice";

const BE_URL = import.meta.env.VITE_BE_URL;

axios.defaults.headers.common["Authorization"] = Cookies.get("token")
  ? `Bearer ${Cookies.get("token")}`
  : "";

// create new order

export const createOrderApi = (order) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());

    const response = await axios.post(`${BE_URL}/create/new-order`, order, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(createOrderSuccess(response.data));
  } catch (error) {
    dispatch(createOrderFail(error.response.data.message));
  }
};

// myOrders

export const userOrdersApi = async (dispatch) => {
  try {
    dispatch(userOrdersRequest());
    const response = await axios.get(`${BE_URL}/my-orders`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch(userOrdersSuccess(response.data));
  } catch (error) {
    dispatch(userOrdersFail(error.response.data.message));
  }
};

// Order detail

export const orderDetailApi = (id) => async (dispatch) => {
  try {
    dispatch(orderDetailRequest());
    const response = await axios.get(`${BE_URL}/order/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch(orderDetailSuccess(response.data));
  } catch (error) {
    dispatch(orderDetailFail(error.response.data.message));
  }
};

//Admin

// delete order api

export const deleteOrderApi = (id) => async (dispatch) => {
  try {
    dispatch(deleteOrderRequest());
    await axios.delete(`${BE_URL}/admin/product/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch(deleteOrderSuccess());
  } catch (error) {
    dispatch(deleteOrderFail(error.response.data.message));
  }
};

//Get all users orders

export const adminOrdersApi = async (dispatch) => {
  try {
    dispatch(adminOrdersRequest());
    const response = await axios.get(`${BE_URL}/Admin/getAllOrders`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(adminOrdersSuccess(response.data));
  } catch (error) {
    dispatch(adminOrdersFail(error.response.data.message));
  }
};

// Update order

export const updateOrderApi = (id, orderData) => async (dispatch) => {
  try {
    dispatch(updateOrderRequest());
    const response = await axios.put(
      `${BE_URL}/admin/orders/${id}`,
      orderData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch(updateOrderSuccess(response.data));
  } catch (error) {
    dispatch(updateOrderFail(error.response.data.message));
  }
};
