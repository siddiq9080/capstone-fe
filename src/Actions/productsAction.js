import axios from "axios";
import {
  adminProductsFail,
  adminProductsRequest,
  adminProductsSuccess,
  productFail,
  productRequest,
  productsFail,
  productsRequest,
  productsSuccess,
  productSuccess,
} from "../Slices/productsSlice";
import {
  deleteProductFail,
  deleteProductRequest,
  deleteProductSuccess,
  newProductFail,
  newProductRequest,
  newProductSuccess,
  updateProductFail,
  updateProductRequest,
  updateProductSuccess,
} from "../Slices/poductSlice";

const BE_URL = import.meta.env.VITE_BE_URL;

// Get all producs

export const getProducts =
  (companyId, productId = null, price = null, rating = null) =>
  async (dispatch) => {
    try {
      dispatch(productsRequest());

      let link = `${BE_URL}/company/${companyId}`;

      if (productId) {
        link += `/product/${productId}`;
        const response = await axios.get(link);
        dispatch(productSuccess(response.data));
      } else {
        if (price) {
          link += `?price[gte]=${price[0]}&price[lte]=${price[1]}`;
        }

        if (rating) {
          link += (price ? "&" : "?") + `ratings=${rating}`;
        }

        const response = await axios.get(link);
        dispatch(productsSuccess(response.data), {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
      }
    } catch (error) {
      dispatch(
        productsFail({
          error: error.response?.data?.message || "Something went wrong",
        })
      );
    }
  };

export const getProduct = (companyId, productId) => async (dispatch) => {
  try {
    dispatch(productRequest());
    const response = await axios.get(
      `${BE_URL}/company/${companyId}/product/${productId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch(productSuccess(response.data));
  } catch (error) {
    dispatch(
      productFail({
        error: error.response?.data?.message || "Something went wrong",
      })
    );
  }
};

//GET ALL products for serach and filter

export const getSerachProducts =
  (keyword, price, category, rating, currentPage) => async (dispatch) => {
    try {
      dispatch(productsRequest());

      let link = `${BE_URL}/getSearchProducts?page=${currentPage}`;

      // Include the keyword if it exists
      if (keyword) {
        link += `&keyword=${keyword}`;
      }

      // Include price filter if it exists
      if (price) {
        link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      }

      // Include category filter if it exists
      if (category) {
        link += `&category=${category}`;
      }

      // Include rating filter if it exists
      if (rating) {
        link += `&ratings=${rating}`;
      }

      // Make the API request
      const response = await axios.get(link);
      dispatch(productsSuccess({ products: response.data.products }));
    } catch (error) {
      dispatch(
        productsFail({
          error: error.response?.data?.message || "Something went wrong",
        })
      );
    }
  };

// Get a searched product

export const getSearchProductApi = (id) => async (dispatch) => {
  try {
    dispatch(productRequest());
    const { data } = await axios.get(`${BE_URL}/product/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch(productSuccess({ product: data.product }));
  } catch (error) {
    dispatch(
      productFail({
        error: error.response?.data?.message || "Something went wrong",
      })
    );
  }
};

// ADMIN

// Get all products

export const getAdminProductsApi = async (dispatch) => {
  try {
    dispatch(adminProductsRequest());
    const response = await axios.get(`${BE_URL}/adminGetAllProducts`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch(adminProductsSuccess(response.data));
  } catch (error) {
    dispatch(adminProductsFail(error.response.data.message));
  }
};

//Create a new product

export const createNewProductApi = (productData) => async (dispatch) => {
  try {
    dispatch(newProductRequest());
    const response = await axios.post(
      `${BE_URL}/admin/new-product`,
      productData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch(newProductSuccess(response.data));
  } catch (error) {
    //handle error
    dispatch(newProductFail(error.response.data.message));
  }
};

// update Single product

export const updateProductApi = (id, productData) => async (dispatch) => {
  try {
    dispatch(updateProductRequest());
    const response = await axios.put(
      `${BE_URL}/admin/product/${id}`,
      productData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch(updateProductSuccess(response.data));
  } catch (error) {
    dispatch(updateProductFail(error.response.data.message));
  }
};

//Delete a single product

export const deleteProductApi = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());
    await axios.delete(`${BE_URL}/admin/product/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch(deleteProductSuccess());
  } catch (error) {
    dispatch(deleteProductFail(error.response.data.message));
  }
};
