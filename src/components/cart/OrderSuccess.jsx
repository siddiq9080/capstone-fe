import { Link } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import MetaData from "../Layout/MetaData";

const OrderSuccess = () => {
  return (
    <div>
      <MetaData title={"Booking success"} />
      <Header />
      <div className="row pt-32 justify-content-center font-playwrite">
        <div className="col-6 mt-5 pb-5  text-center">
          <img
            className="my-5 img-fluid d-block mx-auto animate-pulse"
            src="/success.png"
            alt="Order Success"
            width="200"
            height="200"
          />

          <h2>Your Order has been placed successfully.</h2>

          <Link to="/orders" className="mt-10">
            Go to Bookings
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderSuccess;
