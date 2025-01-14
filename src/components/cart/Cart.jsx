import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  decreaseCartItemQty,
  increaseCartItemQty,
  removeItemFromCart,
} from "../../Slices/cartSlice";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import MetaData from "../Layout/MetaData";

const Cart = () => {
  const { items } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseQty = (item) => {
    if (item.quantity < 5) {
      dispatch(increaseCartItemQty(item.product));
    }
  };

  const decreaseQty = (item) => {
    if (item.quantity > 1) {
      dispatch(decreaseCartItemQty(item.product));
    }
  };

  const checkoutHandler = () => {
    return navigate("/shipping");
  };

  const subtotal = items.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const total = items.reduce(
    (acc, item) => acc + (item.quantity || 0) * (item.price || 0),
    0
  );

  return (
    <>
      <MetaData title={"My cart"} />
      <Header />
      {items.length === 0 ? (
        <h2 className=" font-playwrite text-center py-44">
          Your Cart is Empty{" "}
        </h2>
      ) : (
        <div className="container font-playwrite">
          <h2 className="pt-24">
            Your Cart: <b>{items.length} items</b>
          </h2>

          <div className="row g-4 d-flex justify-content-between">
            {/* Cart Items Section */}
            <div className="col-12">
              {items.map((item) => (
                <div key={item.product} className="mb-3">
                  <div className="cart-item p-3 border rounded ">
                    <div className="row align-items-center">
                      {/* Product Image */}
                      <div className="col-12 col-sm-4 col-lg-3 mb-3 mb-sm-0 text-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded shadow-sm"
                        />
                      </div>

                      {/* Product Name */}
                      <div className="col-12 col-sm-5 col-lg-3 mb-3 mb-sm-0">
                        <Link
                          to={`/product/${item.product}`}
                          className="text-decoration-none text-dark fw-bold"
                        >
                          {item.name}
                        </Link>
                      </div>

                      {/* Product Price */}
                      <div className="col-6 col-sm-4 col-lg-2 text-center">
                        <p
                          id="card_item_price"
                          className="fw-semibold text-secondary"
                        >
                          ${item.price}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="col-6 col-sm-5 col-lg-3 text-center">
                        <div className="stockCounter d-inline-flex align-items-center gap-2">
                          <button
                            disabled={item.quantity === 1}
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => decreaseQty(item)}
                          >
                            <span className="text-lg">-</span>
                          </button>
                          <span className="fw-bold">{item.quantity}</span>
                          <button
                            disabled={item.quantity === 5}
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => increaseQty(item)}
                          >
                            <span className="text-lg">+</span>
                          </button>
                        </div>
                      </div>

                      {/* Delete Button */}
                      <div className="col-12 text-center mt-3 mt-sm-0 float-end">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() =>
                            dispatch(removeItemFromCart(item.product))
                          }
                        >
                          <i className="fa fa-trash"></i> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Order Summary Section */}
            <div className="col-12 col-lg-3 my-4">
              <div
                id="order_summary"
                className="p-4 border rounded bg-light shadow-sm"
              >
                <h4 className="fw-bold mb-3">Order Summary</h4>
                <hr />
                <p className="d-flex justify-content-between">
                  <span>Subtotal:</span>
                  <span className="order-summary-values">
                    {subtotal} (Units)
                  </span>
                </p>
                <p className="d-flex justify-content-between">
                  <span>Est. total:</span>
                  <span className="order-summary-values fw-bold">₹{total}</span>
                </p>
                <hr />
                <button
                  id="checkout_btn"
                  onClick={checkoutHandler}
                  className="btn btn-warning w-100 rounded"
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Cart;
