import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  deleteProductApi,
  getAdminProductsApi,
} from "../../Actions/productsAction";
import Loader from "../Layout/Loader";
import { MDBDataTable } from "mdbreact";
import Sidebar from "./Sidebar";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import MetaData from "../Layout/MetaData";

const ProductList = () => {
  const {
    products = [],
    loading = true,
    error,
  } = useSelector((state) => state.productsState);
  const { isProductDeleted, error: productError } = useSelector(
    (state) => state.productState
  );
  const dispatch = useDispatch();

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
        stock: product.stock,
        actions: (
          <>
            <Link
              to={`/admin/product/${product._id}`}
              className="btn btn-primary"
            >
              {" "}
              <i className="fa fa-pencil"></i>
            </Link>
            <Button
              onClick={(e) => deleteHandler(e, product._id)}
              className="btn btn-danger py-1 px-2 ml-2"
            >
              <i className="fa fa-trash"></i>
            </Button>
          </>
        ),
      });
    });

    return data;
  };

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteProductApi(id));
  };

  useEffect(() => {
    if (error || productError) {
      return toast.error(error || productError);
    }
    if (isProductDeleted) {
      return toast.success("Product Deleted Succesfully!");
    }

    dispatch(getAdminProductsApi);
  }, [dispatch, error, isProductDeleted, productError]);

  return (
    <>
      <MetaData title={"ServiceList"} />
      <Header />

      <div className="row py-20">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10 font-playwrite">
          <h1 className="my-4">Service List</h1>

          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setProducts()}
              bordered
              striped
              hover
              className="px-3"
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
