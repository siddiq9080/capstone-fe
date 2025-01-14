import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import { createNewProductApi } from "../../Actions/productsAction";
import Header from "../Layout/Header";
import Loader from "../Layout/Loader";
import Footer from "../Layout/Footer";
import MetaData from "../Layout/MetaData";

const CreateNewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);
  const [ratings, setRatings] = useState(0);
  const [workers, setWorkers] = useState(1);

  const { loading, isProductCreated, error } = useSelector(
    (state) => state.productState
  );

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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    // Check for empty fields
    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !seller ||
      !images[0] ||
      !workers ||
      isAvailable === undefined
    ) {
      toast.error("Please fill all fields before submitting!");
      return;
    }

    const formData = {
      name,
      price,
      description,
      category,
      seller,
      images: images.map((url) => ({ image: url })),
      workers,
      isAvailable,
    };

    dispatch(createNewProductApi(formData));
  };

  useEffect(() => {
    if (isProductCreated) {
      toast.success("Product Created Successfully!");
      navigate("/admin/productList");
    }

    if (error) {
      toast.error(error);
    }
  }, [isProductCreated, error, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <MetaData title={"CreateNewService"} />
      <Header />

      <div className="row py-20 font-playwrite">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10 w-8/12 ">
          <div className="wrapper">
            <form
              onSubmit={submitHandler}
              className="shadow-lg px-10 py-5 w-8/12 mx-auto"
              encType="multipart/form-data"
            >
              <h1 className="mb-4 text-center">New Product</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="number"
                  id="price_field"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea
                  className="form-control"
                  id="description_field"
                  rows="4"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-control"
                  id="category_field"
                  required
                >
                  <option value="">Select</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="seller_field">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  onChange={(e) => setSeller(e.target.value)}
                  value={seller}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="ratings_field">Ratings</label>
                <input
                  type="number"
                  id="ratings_field"
                  className="form-control"
                  onChange={(e) => setRatings(e.target.value)}
                  value={ratings}
                  min="0"
                  max="5"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="workers_field">Workers</label>
                <input
                  type="number"
                  id="workers_field"
                  className="form-control"
                  onChange={(e) => setWorkers(e.target.value)}
                  value={workers}
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="isAvailable_field">Available</label>
                <select
                  onChange={(e) => setIsAvailable(e.target.value === "true")}
                  className="form-control"
                  id="isAvailable_field"
                  required
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="image_url_field">Image URL</label>
                <input
                  type="text"
                  id="image_url_field"
                  className="form-control"
                  onChange={(e) => setImages([e.target.value])}
                  value={images[0] || ""}
                  required
                />
              </div>

              <button
                id="login_button"
                type="submit"
                disabled={loading}
                className="btn btn-block btn-primary py-3 "
              >
                CREATE
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateNewProduct;
