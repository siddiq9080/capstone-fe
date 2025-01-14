import { useState } from "react";
import PropTypes from "prop-types";
import { Carousel } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { companyProductsAddCartApi } from "../../Actions/cartAction";

const ProductDetailCard = ({
  images,
  name,
  price,
  ratings,
  description,
  seller,
  isAvailable,
  numOfReviews,
  _id,
  companyId,
}) => {
  const dispatch = useDispatch();

  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [quantity, setQuantity] = useState(1);

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

  const handleTimeClick = (time) => {
    setSelectedTime(time === selectedTime ? "" : time);
  };

  const increaseQty = () => {
    if (quantity < 5) setQuantity(quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    if (!selectedDay || !selectedMonth || !selectedYear || !selectedTime) {
      toast.error("Please select a day, month, year, and time.");
      return;
    }

    toast.success("Booking added to cart!");
    dispatch(companyProductsAddCartApi(companyId, _id, quantity));
    toast.success(`${quantity} item(s) added to Cart!`);
  };

  return (
    <div className="card p-3 mb-4 shadow">
      <div className="row g-3">
        {/* Image Carousel Section */}
        <div className="col-md-5">
          <div className="card-img-top">
            <Carousel pause="hover" className="w-100">
              {images &&
                images.length > 0 &&
                images.map((image) => (
                  <Carousel.Item key={image._id}>
                    <img
                      src={image.image}
                      alt={name}
                      className="object-cover d-block md:mt-10 w-100 rounded"
                      style={{ height: "400px" }}
                    />
                  </Carousel.Item>
                ))}
            </Carousel>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="col-md-7">
          <h3 className="text-center mb-3">{name}</h3>
          <h4 className="text-center text-primary">₹{price}</h4>
          <h6 className="text-center text-muted">Sold by: {seller}</h6>

          {/* Ratings */}
          <div className="d-flex justify-content-center align-items-center my-2">
            {[1, 2, 3, 4, 5].map((star) => {
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
            })}
            <span style={{ marginLeft: "8px" }}>{ratings}</span>
            <span className="ms-2 text-muted">({numOfReviews} Reviews)</span>
          </div>

          {/* Availability Status */}
          <p className="text-center">
            Status:{" "}
            <span
              className={`badge p-2  ${
                isAvailable ? "bg-success" : "bg-danger"
              }`}
            >
              {isAvailable ? "Available" : "Not Available"}
            </span>
          </p>

          <p className="text-start">{description}</p>

          <hr />

          {/* Date Selection */}
          <div className="mb-3">
            <h6>Select Date:</h6>
            <div className="d-flex flex-wrap gap-2">
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
                <span
                  key={time}
                  className={`badge ${
                    selectedTime === time
                      ? "bg-primary text-white"
                      : "bg-secondary text-dark"
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleTimeClick(time)}
                >
                  {time}
                </span>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="d-flex align-items-center gap-2">
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
              disabled={!isAvailable}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductDetailCard.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      image: PropTypes.string,
    })
  ),
  name: PropTypes.string,
  price: PropTypes.number,
  ratings: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  description: PropTypes.string,
  seller: PropTypes.string,
  isAvailable: PropTypes.bool,
  numOfReviews: PropTypes.number,
  _id: PropTypes.string,
  companyId: PropTypes.string,
};

export default ProductDetailCard;
