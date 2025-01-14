import { toast } from "react-toastify";
import { orderDetailApi, updateOrderApi } from "../../Actions/orderAction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "../Layout/Footer";
import MetaData from "../Layout/MetaData";

const UpdateOrder = () => {
  const { loading, isOrderUpdated, error, orderDetail } = useSelector(
    (state) => state.orderState
  );

  const { user } = useSelector((state) => state.authState);
  const {
    orderItems = [],
    shippingInfo = {},
    totalPrice = 0,
    paymentInfo = {},
  } = orderDetail;
  const isPaid = paymentInfo.status === "succeeded" ? true : false;
  const [orderStatus, setOrderStatus] = useState("Processing");
  const { id: orderId } = useParams();

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const orderData = {};
    orderData.orderStatus = orderStatus;
    dispatch(updateOrderApi(orderId, orderData));
  };

  useEffect(() => {
    if (isOrderUpdated) {
      return toast.success("Order Updated Succesfully!");
    }

    if (error) {
      return toast.error(error);
    }
    if (orderDetail._id) {
      return setOrderStatus(orderDetail.orderStatus);
    }

    dispatch(orderDetailApi(orderId));
  }, [isOrderUpdated, error, dispatch, orderId, orderDetail]);

  return (
    <div className="row font-playwrite">
       <MetaData title={"UpdateOrder"} />
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10 font-playwrite">
        <div className="row d-flex justify-content-around">
          <div className="col-12 col-lg-8 mt-5 order-details">
            <h1 className="my-5">Order # {orderDetail._id}</h1>

            <h4 className="mb-4">Shipping Info</h4>
            <p>
              <b>Name:</b> {user.name}
            </p>
            <p>
              <b>Phone:</b> {shippingInfo.phoneNo}
            </p>
            <p className="mb-4">
              <b>Address:</b>
              {shippingInfo.address}, {shippingInfo.city},{" "}
              {shippingInfo.postalCode}, {shippingInfo.state},{" "}
              {shippingInfo.country}
            </p>
            <p>
              <b>Amount:</b> ₹{totalPrice}
            </p>

            <hr />

            <h4 className="my-4">Payment</h4>
            <p className={isPaid ? "greenColor" : "redColor"}>
              <b>{isPaid ? "PAID" : "NOT PAID"}</b>
            </p>

            <h4 className="my-4">Order Status:</h4>
            <p
              className={
                orderStatus && orderStatus.includes("Completed")
                  ? "greenColor"
                  : "redColor"
              }
            >
              <b>{orderStatus}</b>
            </p>

            <h4 className="my-4">Order Items:</h4>

            <hr />
            <div className="cart-item my-1">
              {orderItems &&
                orderItems.map((item) => (
                  <div className="row my-5" key={item.name}>
                    <div className="col-4 col-lg-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        height="45"
                        width="65"
                      />
                    </div>

                    <div className="col-5 col-lg-5">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p>${item.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <p>{item.quantity} service(s)</p>
                    </div>
                  </div>
                ))}
            </div>
            <hr />
          </div>
          <div className="col-12 col-lg-3 mt-5">
            <h4 className="my-4">Order Status</h4>
            <div className="form-group">
              <select
                className="form-control"
                onChange={(e) => setOrderStatus(e.target.value)}
                value={orderStatus}
                name="status"
              >
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <button
              disabled={loading}
              onClick={submitHandler}
              className="btn btn-primary btn-block"
            >
              Update Status
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateOrder;
