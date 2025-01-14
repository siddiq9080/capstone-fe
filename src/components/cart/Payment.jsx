import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateShipping } from "./Shipping";
import { toast } from "react-toastify";
import axios from "axios";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { orderCompleted } from "../../Slices/cartSlice";
import { createOrderApi } from "../../Actions/orderAction";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import MetaData from "../Layout/MetaData";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const { user } = useSelector((state) => state.authState);
  const { items: cartItems, shippingInfo } = useSelector(
    (state) => state.cartState
  );
  const { error: orderError } = useSelector((state) => state.orderState);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
    shipping: {
      name: user.name,
      address: {
        city: shippingInfo.city,
        postal_code: shippingInfo.postalCode,
        country: shippingInfo.country,
        state: shippingInfo.state,
        line1: shippingInfo.address,
      },
      phone: shippingInfo.phoneNo,
    },
  };

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  useEffect(() => {
    validateShipping(shippingInfo, navigate);
    if (orderError) {
      return toast.error(orderError);
    }
  }, [navigate, shippingInfo, orderError]);

  const BE_URL = import.meta.env.VITE_BE_URL;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${BE_URL}/payment/process`,
        paymentData
      );
      const clientSecret = data.client_secret;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if ((await result).paymentIntent.status === "succeeded") {
          toast.success("Payment Success!");
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(orderCompleted());
          dispatch(createOrderApi(order));

          navigate("/order/success");
        } else {
          toast.warning("Please Try again!");
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
    <MetaData title={"Payment"} />
      <Header />
      <div className="row wrapper font-playwrite">
        <div className="col-12 col-md-7 mx-auto mt-10 py-20 ">
          <form onSubmit={submitHandler} className="shadow-lg px-10 py-10">
            <h1 className="mb-4 text-center">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                value=""
              />
            </div>

            <button
              id="pay_btn"
              type="submit"
              className="btn btn-block btn-primary py-3"
            >
              Pay - {` ₹${orderInfo.totalPrice}`}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
