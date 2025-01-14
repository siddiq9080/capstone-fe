import { toast } from "react-toastify";
import { getSingleUserApi, updateUserApi } from "../../Actions/authAction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import MetaData from "../Layout/MetaData";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { id: userId } = useParams();

  const { loading, isUserUpdated, error, user } = useSelector(
    (state) => state.userState
  );

  const { user: authUser } = useSelector((state) => state.authState);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);
    dispatch(updateUserApi(userId, formData));
  };

  useEffect(() => {
    if (isUserUpdated) {
      return toast.success("User Updated Succesfully!");
    }

    if (error) {
      return toast.error(error);
    }

    dispatch(getSingleUserApi(userId));
  }, [isUserUpdated, error, dispatch, userId]);

  useEffect(() => {
    if (user._id) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  return (
    <>
     <MetaData title={"UpdateUser"} />
      <Header />

      <div className="row font-playwrite py-20">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <div className="wrapper my-5">
            <form
              onSubmit={submitHandler}
              className="shadow-lg p-10"
              encType="multipart/form-data"
            >
              <h1 className="mb-4 text-center">Update User</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price_field">Email</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category_field">Role</label>
                <select
                  disabled={user._id === authUser._id}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-control"
                  id="category_field"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <button
                id="login_button"
                type="submit"
                disabled={loading}
                className="btn btn-block btn-primary py-3"
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

export default UpdateUser;
