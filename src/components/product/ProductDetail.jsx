import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getSearchProductApi } from "../../Actions/productsAction";
import { useParams } from "react-router-dom";
import { addCartItemApi } from "../../Actions/cartAction";
import Header from "../Layout/Header";
import Loader from "../Layout/Loader";
import Footer from "../Layout/Footer";
import MetaData from "../Layout/MetaData";

const ProductDetail = () => {
  const { product, loading, error } = useSelector(
    (state) => state.productsState
  );
  const { id } = useParams();
  const dispatch = useDispatch();

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() + i
  );
  const times = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const [quantity, setQuantity] = useState(1);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const increaseQty = () => {
    if (quantity < 5) setQuantity(quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    dispatch(getSearchProductApi(id));
  }, [id, dispatch]);

  const handleAddToCart = () => {
    if (!selectedDay || !selectedMonth || !selectedYear || !selectedTime) {
      toast.error("Please select a day, month, year, and time.");
      return;
    }

    toast.success("Booking added to cart!");
    dispatch(addCartItemApi(product._id, quantity));
    toast.success(`${quantity} item(s) added to Cart!`);
  };

  const renderStars = (ratings) => {
    return Array.from({ length: 5 }, (_, i) => {
      const star = i + 1;
      if (ratings >= star) {
        return (
          <i
            key={star}
            className="fa-solid fa-star"
            style={{ color: "#FFD700" }}
          ></i>
        );
      } else if (ratings >= star - 0.5) {
        return (
          <i
            key={star}
            className="fa-solid fa-star-half-alt"
            style={{ color: "#FFD700" }}
          ></i>
        );
      } else {
        return (
          <i
            key={star}
            className="fa-regular fa-star"
            style={{ color: "#C0C0C0" }}
          ></i>
        );
      }
    });
  };

  if (loading) return <Loader />;

  return (
    <>
      <MetaData title={"service Detail"} />
      <Header />
      <div className="font-playwrite container container-fluid pt-28">
        <div className="card p-3 mb-4 shadow">
          <div className="row d-flex justify-content-around">
            <div className="col-12 col-md-5 img-fluid">
              {product.images &&
              Array.isArray(product.images) &&
              product.images.length > 0 ? (
                <Carousel pause="hover">
                  {product.images.map((image) => (
                    <Carousel.Item key={image._id}>
                      <img
                        src={image.image}
                        alt={product.name}
                        className="object-cover d-block md:mt-24 w-100 rounded"
                        style={{ height: "400px" }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <p>No images available</p>
              )}
            </div>

            <div className="col-12 col-md-6">
              <h1>{product.name}</h1>
              <div>
                <div>{renderStars(product.ratings)}</div>
                <span style={{ marginLeft: "8px" }}>{product.ratings}</span>
              </div>
              <span>({product.numOfReviews} Reviews)</span>
              <hr />
              <p>Price: ₹{product.price}</p>
              <p>{product.description}</p>

              {/* Date Selection */}
              <div className="mb-3">
                <h6>Select Date:</h6>
                <div className="d-flex gap-2">
                  <select
                    className="form-select"
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                  >
                    <option value="">Day</option>
                    {days.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select
                    className="form-select"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option value="">Month</option>
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    className="form-select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="">Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time Selection */}
              <div className="mb-3">
                <h6>Select Time:</h6>
                <div className="d-flex flex-wrap gap-2">
                  {times.map((time) => (
                    <button
                      key={time}
                      className={`badge ${
                        selectedTime === time
                          ? "bg-primary text-white"
                          : "bg-secondary text-white"
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <span className="d-block">
                <button
                  className="btn btn-success"
                  onClick={increaseQty}
                  disabled={quantity === 5}
                >
                  +
                </button>

                <span>{quantity}</span>
                <button
                  className="btn btn-warning"
                  onClick={decreaseQty}
                  disabled={quantity === 1}
                >
                  -
                </button>

                <button
                  className="btn btn-primary"
                  disabled={!product.isAvailable}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
