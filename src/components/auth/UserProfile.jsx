import { useSelector } from "react-redux";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import MetaData from "../Layout/MetaData";

function UserProfile() {
  const { user, loading } = useSelector((state) => state.authState);

  // Show loading state if user data is not available yet
  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return toast.error("User not found");
  }

  return (
    <>
     <MetaData title={"My Profile"} />
      <Header />
      <div className="container">
        <div className="row  text-center pt-28 pb-64">
          <div className="col-12 ">
            <h4 className="font-bold">Full Name</h4>
            <p>{user.name}</p>

            <h4 className="font-bold">Email Address</h4>
            <p>{user.email}</p>

            <h4 className="font-bold">JoinedAt</h4>
            <p>{String(user.createdAt).substring(0, 10)}</p>
            <Link to="/cart">
              <button className="btn btn-primary"> My Cart </button>
            </Link>

            <Link to="/orders">
              <button className="btn btn-primary"> My Bookings </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserProfile;
