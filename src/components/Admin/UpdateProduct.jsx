import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import { updateProductApi } from "../../Actions/productsAction";
import Header from "../Layout/Header";
import Loader from "../Layout/Loader";
import Footer from "../Layout/Footer";
import MetaData from "../Layout/MetaData";

const UpdateProduct = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([""]);
  const [workers, setWorkers] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);

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

  const { loading, error, isProductUpdated } = useSelector(
    (state) => state.productState
  );

  useEffect(() => {
    // Check if the product was updated successfully
    if (isProductUpdated) {
      toast.success("Product updated successfully!");
      navigate("/admin/productList"); // Redirect to the product list
    }

    if (error) {
      toast.error(error);
    }
  }, [isProductUpdated, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    // Validate form data
    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !seller ||
      !images[0] ||
      !workers
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
      images: images.map((url) => ({ image: url })), // Wrap URLs in objects
      workers,
      isAvailable,
    };

    dispatch(updateProductApi(id, formData));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
     <MetaData title={"UpdateProduct"} />
      <Header />
      <div className="row py-20 font-playwrite">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <div className="wrapper ">
            <form
              onSubmit={submitHandler}
              className="shadow-lg px-10 py-3"
              encType="multipart/form-data"
            >
              <h1 className="mb-4 text-center">Update Product</h1>

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
                  value={category}
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

              <div className="form-group">
                <label htmlFor="workers_field">Workers</label>
                <input
                  type="number"
                  id="workers_field"
                  className="form-control"
                  onChange={(e) => setWorkers(e.target.value)}
                  value={workers}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="availability_field">Available</label>
                <input
                  type="checkbox"
                  id="availability_field"
                  onChange={(e) => setIsAvailable(e.target.checked)}
                  checked={isAvailable}
                />
              </div>

              <button
                id="update_button"
                type="submit"
                disabled={loading}
                className="btn btn-block btn-warning py-3 rounded"
              >
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdateProduct;
