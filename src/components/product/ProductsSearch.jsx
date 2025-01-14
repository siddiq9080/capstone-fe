import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Tooltip from "rc-tooltip";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import { getSerachProducts } from "../../Actions/productsAction.js";
import Loader from "../Layout/Loader";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import MetaData from "../Layout/MetaData.jsx";

const ProductsSearch = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.productsState
  );

  const [price, setPrice] = useState([1, 1000]);
  const [priceChanged, setPriceChanged] = useState(price);
  const [category, setCategory] = useState(null);
  const [rating, setRating] = useState(0);

  const { keyword } = useParams();

  const categories = [
    "Home Cleaning",
    "Office Cleaning",
    "Carpet Cleaning",
    "Toilet Cleaning",
    "Car Wash",
    "Yard Cleaning",
    "Deep Cleaning",
    "Post-construction Cleaning",
    "Laundry Services",
    "Window Cleaning",
    "Sanitization Services",
  ];

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(getSerachProducts(keyword, priceChanged, category, rating));
  }, [dispatch, keyword, priceChanged, category, rating, error]);

  return (
    <>
      <MetaData title={"Searched Services"} />

      <Header />

      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-center py-20">Searched Services</h1>
          <section className="container">
            <div className="row">
              {/* Filters */}
              <div className="col-12 col-md-3 mb-5">
                {/* Price Filter */}
                <button
                  className="px-4"
                  onMouseUp={() => setPriceChanged(price)}
                >
                  <h4>Price Range</h4>
                  <Slider
                    range
                    marks={{
                      1: "₹1",
                      1000: "₹1000",
                    }}
                    min={1}
                    max={1000}
                    defaultValue={price}
                    onChange={(value) => setPrice(value)}
                    handleRender={(renderProps) => (
                      <Tooltip
                        overlay={`₹${renderProps.props["aria-valuenow"]}`}
                        visible
                      >
                        <div {...renderProps.props}></div>
                      </Tooltip>
                    )}
                  />
                </button>
                <hr className="my-4" />

                {/* Category Filter */}
                <div>
                  <h4>Categories</h4>
                  <ul className="list-unstyled">
                    {categories.map((categoryItem) => (
                      <li
                        key={categoryItem}
                        className={`mb-2 ${
                          category === categoryItem ? "font-weight-bold" : ""
                        }`}
                        style={{ cursor: "pointer" }}
                        onClick={() => setCategory(categoryItem)}
                      >
                        {categoryItem}
                      </li>
                    ))}
                  </ul>
                </div>
                <hr className="my-4" />

                {/* Ratings Filter */}
                <div>
                  <h4>Ratings</h4>
                  <ul className="list-unstyled">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <button
                        key={star}
                        className={`mb-2 ${
                          rating === star ? "font-weight-bold" : ""
                        }`}
                        style={{ cursor: "pointer" }}
                        onClick={() => setRating(star)}
                      >
                        <span>{star} ⭐</span>
                      </button>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Products */}
              <div className="col-12 col-md-9">
                {products.length > 0 ? (
                  <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {products.map((product) => (
                        <div className="row  mx-2" key={product._id}>
                          <div className="card  p-0 shadow-sm">
                            {/* Product Image */}
                            <img
                              className="w-100  rounded-top"
                              src={product.images[0].image}
                              alt={product.name}
                              style={{ height: "200px", objectFit: "cover" }}
                            />

                            {/* Product Details */}
                            <div className="card-body">
                              <h5 className="card-title text-black">
                                {product.name}
                              </h5>
                              <p className="card-text text-black">
                                <strong className="text-black">
                                  Price: ₹{product.price}
                                </strong>
                              </p>
                              <div>
                                {[1, 2, 3, 4, 5].map((star) => {
                                  if (product.ratings >= star) {
                                    // Full star
                                    return (
                                      <i
                                        key={star}
                                        className="fa-solid fa-star"
                                        style={{ color: "#FFD700" }} // Gold color
                                      ></i>
                                    );
                                  } else if (product.ratings >= star - 0.5) {
                                    // Half star
                                    return (
                                      <i
                                        key={star}
                                        className="fa-solid fa-star-half-alt"
                                        style={{ color: "#FFD700" }} // Gold color
                                      ></i>
                                    );
                                  } else {
                                    // Empty star
                                    return (
                                      <i
                                        key={star}
                                        className="fa-regular fa-star"
                                        style={{ color: "#C0C0C0" }} // Silver/Gray color
                                      ></i>
                                    );
                                  }
                                })}
                                <span style={{ marginLeft: "8px" }}>
                                  {product.ratings}
                                </span>
                              </div>
                              <p>
                                <strong>Reviews:</strong> {product.numOfReviews}{" "}
                              </p>
                              <p>
                                <strong>Workers Available:</strong>{" "}
                                {product.workers}
                              </p>
                            </div>
                            <Link to={`/product/${product._id}`}>
                              <div className="w-75 mx-auto hover:scale-110 transition-all mb-2">
                                <button className="btn btn-primary">
                                  View Details
                                </button>
                              </div>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <h5 className="text-center">No Service found</h5>
                )}
              </div>
            </div>
          </section>
        </>
      )}
      <Footer />
    </>
  );
};

export default ProductsSearch;
