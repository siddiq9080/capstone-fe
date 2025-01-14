import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getProduct } from "../../Actions/productsAction";
import Loader from "../Layout/Loader";
import ProductDetailCard from "../cardDesign/ProductDetailCard";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import MetaData from "../Layout/MetaData";

const CompanyProductsDetail = () => {
  const { companyId, productId } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productsState
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    dispatch(getProduct(companyId, productId));
  }, [error, dispatch, companyId, productId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <MetaData title={"Services details"} />
      <Header />
      {product ? (
        <div className="container font-playwrite mx-auto pt-32">
          <div className="row">
            <div key={product._id}>
              <ProductDetailCard {...product} companyId={companyId} />
            </div>
          </div>
        </div>
      ) : (
        <div>No product found</div>
      )}
      <Footer />
    </>
  );
};

export default CompanyProductsDetail;
