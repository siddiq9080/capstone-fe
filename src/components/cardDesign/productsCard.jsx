import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductsCard = ({
  _id,
  name,
  price,
  ratings,
  numOfReviews,
  images,
  companyId,
  workers,
}) => {
  return (
    <div className="card">
      <Link to={`/company/${companyId}/product/${_id}`}>
        <div className="card-img-top">
          {images?.length > 0 ? (
            <img
              src={images[0]?.image}
              alt={name}
              style={{ height: 200 }}
              className="object-cover h-full w-full"
            />
          ) : (
            <img
              src="placeholder-image-url.jpg"
              alt="Placeholder"
              style={{ height: 200 }}
              className="object-cover h-full w-full"
            />
          )}
        </div>
      </Link>
      <div className="body px-2">
        <Link to={`/company/${companyId}/product/${_id}`}>
          <h5 className="card-title mt-3 text-black">{name}</h5>
        </Link>
        <p className="card-text text-black">
          <strong>Price:</strong> ₹{price}
        </p>
        <div>
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
        </div>
        <p className="card-text mt-2">
          <strong>Reviews:</strong> {numOfReviews}
        </p>
        <p className="card-text">
          <strong>Workers Available:</strong> {workers}
        </p>
        <Link to={`/company/${companyId}/product/${_id}`}>
          <div className=" mx-auto hover:scale-110 transition-all my-2  text-center">
            <button className="btn btn-primary w-9/12 rounded-xl hover:rounded-3xl">
              View details
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

ProductsCard.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  ratings: PropTypes.string,
  numOfReviews: PropTypes.number,
  images: PropTypes.array,
  companyId: PropTypes.string,
  workers: PropTypes.number,
};

export default ProductsCard;
