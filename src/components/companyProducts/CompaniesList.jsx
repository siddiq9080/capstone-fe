import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../Layout/Loader";
import CompanyCard from "../cardDesign/CompanyCard";
import { getAllCompany } from "../../Actions/CompanyAction";
import Footer from "../Layout/Footer";

const CompaniesList = () => {
  const dispatch = useDispatch();

  const { loading, companies, error } = useSelector(
    (state) => state.companiesState
  );

  useEffect(() => {
    if (error) {
      return toast.error(error);
    }
    dispatch(getAllCompany());
  }, [dispatch, error]);

  return (
    <div className="font-playwrite">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-center py-4">Our Services</h1>
          <div className="container-sm mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {companies?.map((company) => (
                <div key={company._id}>
                  {/* No need to wrap with Link here */}
                  <CompanyCard {...company} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default CompaniesList;
