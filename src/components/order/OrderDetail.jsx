import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { orderDetailApi } from "../../Actions/orderAction";
import Loader from "../Layout/Loader";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import MetaData from "../Layout/MetaData";

const OrderDetail = () => {
  const { orderDetail, loading } = useSelector((state) => state.orderState);
  const {
    shippingInfo = {},
    user = {},
    orderStatus = "Processing",
    orderItems = [],
    totalPrice = 0,
    paymentInfo = {},
  } = orderDetail;
  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(orderDetailApi(id));
  }, [id, dispatch]);

  return (
    <div>
      <MetaData title={"Order detail"} />
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <div className="row d-flex justify-content-between container font-playwrite">
          <div className="col-12 col-lg-8 mx-auto mt-5 order-details">
            <h6 className="my-5">Booking: #{orderDetail._id}</h6>

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
              <b>Amount:</b> ${totalPrice}
            </p>

            <hr />

            <h4 className="my-4">Payment</h4>
            <p className={isPaid ? "greenColor" : "redColor"}>
              <b>{isPaid ? "PAID" : "NOT PAID"}</b>
            </p>

            <h4 className="my-4">Booking Status:</h4>
            <p
              className={
                orderStatus && orderStatus.includes("Completed")
                  ? "greenColor"
                  : "redColor"
              }
            >
              <b>{orderStatus}</b>
            </p>

            <h4 className="my-4">Booking Items:</h4>

            <hr />
            <div className="cart-item my-1">
              {orderItems &&
                orderItems.map((item) => (
                  <div className="row my-5" key={item._id}>
                    <div className="col-5 col-lg-4">
                      <img src={item.image} alt={item.name} className="h-56" />
                    </div>

                    <div className="col-3 col-lg-3">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>

                    <div className="col-2 col-lg-2 mt-4 mt-lg-0">
                      <p>₹{item.price}</p>
                    </div>

                    <div className="col-2 col-lg-3 mt-4 mt-lg-0">
                      <p>{item.quantity} Service(s)</p>
                    </div>
                  </div>
                ))}
            </div>
            <hr />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default OrderDetail;
