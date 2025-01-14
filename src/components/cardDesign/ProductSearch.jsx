import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ProductsSearchCard({ product }) {
  return (
    <div className={`col-sm-12 col-md-6 col-lg-4 my-3`}>
      <div className="card p-3 rounded">
        {product.images.length > 0 && (
          <img
            className="card-img-top mx-auto"
            src={product.images[0].image}
            alt={product.name}
          />
        )}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
          </div>
          <p className="card-text">${product.price}</p>
          <Link to={`/company/${product.companyId}/product/${product._id}`}>
            <button className="btn btn-primary">View details</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

ProductsSearchCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    ratings: PropTypes.number,
    numOfReviews: PropTypes.number,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
      })
    ),
    companyId: PropTypes.string,
  }),
};
