import { Link } from "react-router-dom";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import MetaData from "./Layout/MetaData";

const PageNotFound = () => {
  return (
    <>
      <MetaData title={"Page Not Found"} />;
      <Header />
      <div className="pt-20">
        <h1 className="text-center">Page Not found </h1>

        <Link to="/">Go to Home page</Link>
      </div>
      <Footer />
    </>
  );
};

export default PageNotFound;
