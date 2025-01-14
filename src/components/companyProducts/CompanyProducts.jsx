import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from "../../Actions/productsAction";
import Loader from "../Layout/Loader";
import ProductsCard from "../cardDesign/productsCard";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import MetaData from "../Layout/MetaData";

const CompanyProducts = () => {
  const { id: companyId } = useParams();
  const dispatch = useDispatch();

  const { loading, products, error } = useSelector(
    (state) => state.productsState
  );

  useEffect(() => {
    dispatch(getProducts(companyId));
  }, [dispatch, companyId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    <MetaData title={"Services"} />
      <Header />

      <div className="font-playwrite pt-32">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id}>
                {/* <h1>{product.category}</h1> */}
                <ProductsCard {...product} companyId={companyId} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CompanyProducts;
