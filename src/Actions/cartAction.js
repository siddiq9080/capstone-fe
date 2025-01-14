import axios from "axios";
import { addCartItemRequest, addCartItemSuccess } from "../Slices/cartSlice";

const BE_URL = import.meta.env.VITE_BE_URL;

export const addCartItemApi = (id, quantity) => async (dispatch) => {
  try {
    dispatch(addCartItemRequest());
    const response = await axios.get(`${BE_URL}/product/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(
      addCartItemSuccess({
        product: response.data.product_id,
        name: response.data.product.name,
        price: response.data.product.price,
        image: response.data.product.images[0].image,
        quantity,
      })
    );
  } catch (error) {
    alert(error);
  }
};

export const companyProductsAddCartApi =
  (companyId, productId, quantity) => async (dispatch) => {
    try {
      dispatch(addCartItemRequest());

      const response = await axios.get(
        `${BE_URL}/company/${companyId}/product/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const product = response.data.product;

      dispatch(
        addCartItemSuccess({
          product: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0].image,
          quantity,
        })
      );
    } catch (error) {
      alert(error);
    }
  };
