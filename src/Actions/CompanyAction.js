import axios from "axios";
import {
  companiesFail,
  companiesRequest,
  companiesSuccess,
} from "../Slices/companiesSlice";

const BE_URL = import.meta.env.VITE_BE_URL;

export const getAllCompany = () => async (dispatch) => {
  try {
    dispatch(companiesRequest());

    const response = await axios.get(`${BE_URL}/companies`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(companiesSuccess({ companies: response.data.companies }));
  } catch (error) {
    dispatch(
      companiesFail({
        error: error.response?.data?.message || "Something went wrong",
      })
    );
  }
};
