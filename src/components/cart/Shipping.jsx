import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../Slices/cartSlice";
import { toast } from "react-toastify";
import CheckoutSteps from "./CheckoutSteps";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import MetaData from "../Layout/MetaData";

export const validateShipping = (shippingInfo, navigate) => {
  if (
    !shippingInfo.address ||
    !shippingInfo.city ||
    !shippingInfo.state ||
    !shippingInfo.country ||
    !shippingInfo.phoneNo ||
    !shippingInfo.postalCode
  ) {
    toast.error("Please fill the shipping information");
    navigate("/shipping");
  }
};

const Shipping = () => {
  const { shippingInfo = {} } = useSelector((state) => state.cartState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    address: shippingInfo.address || "",
    city: shippingInfo.city || "",
    phoneNo: shippingInfo.phoneNo || "",
    postalCode: shippingInfo.postalCode || "",
    state: shippingInfo.state || "",
    country: shippingInfo.country || "India",
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const shippingSubmit = (e) => {
    e.preventDefault();
    const { address, city, phoneNo, postalCode, state, country } = formState;

    if (!address || !city || !phoneNo || !postalCode || !state || !country) {
      toast.error("Please fill all the fields");
      return;
    }

    dispatch(
      saveShippingInfo({ address, city, phoneNo, postalCode, state, country })
    );
    navigate("/order/confirm");
  };

  return (
    <>
    <MetaData title={"Address"} />
      <Header />

      <div className=" mx-auto font-playwrite">
        <CheckoutSteps shipping />
        <div className="col-12 ">
          <div className="row wrapper pt-10 ">
            <div className="col-12 ">
              <form className="pb-20 w-8/12 mx-auto" onSubmit={shippingSubmit}>
                <h1 className="text-center">Address Info</h1>

                <div className="form-group">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="form-control"
                    placeholder="12 street,"
                    value={formState.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    className="form-control"
                    placeholder="Enter city name"
                    value={formState.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNo" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNo"
                    id="phoneNo"
                    placeholder="Enter your phone number"
                    className="form-control"
                    value={formState.phoneNo}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="postalCode" className="form-label">
                    Postal Code
                  </label>
                  <input
                    type="number"
                    name="postalCode"
                    id="postalCode"
                    className="form-control"
                    value={formState.postalCode}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    className="form-control"
                    value={formState.state}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    className="form-control"
                    value={formState.country}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  CONTINUE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shipping;
