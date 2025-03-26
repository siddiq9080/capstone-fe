import { Link } from "react-router-dom";
import { deleteUserApi, getAllUsersApi } from "../../Actions/authAction";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import { MDBDataTable } from "mdbreact";
import Loader from "../Layout/Loader";
import PropTypes from "prop-types";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import MetaData from "../Layout/MetaData";

const UserList = () => {
  const {
    users = [],
    loading = true,
    error,
    isUserDeleted,
  } = useSelector((state) => state.userState);

  const dispatch = useDispatch();

  const setUsers = () => {
    const data = {
      columns: [
        { label: "ID", field: "id", sort: "asc" },
        { label: "Name", field: "name", sort: "asc" },
        { label: "Email", field: "email", sort: "asc" },
        { label: "Role", field: "role", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: [],
    };

    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        actions: (
          <>
            <Link to={`/admin/user/${user._id}`} className="btn btn-primary">
              <i className="fa fa-pencil"></i>
            </Link>
            <Button
              onClick={(e) => deleteHandler(e, user._id)}
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
    dispatch(deleteUserApi(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isUserDeleted) {
      toast.success("User Deleted Successfully!");
    }
    dispatch(getAllUsersApi);
  }, [dispatch, error, isUserDeleted]);

  return (
    <>
     <MetaData title={"UserList"} />
      <Header />

      <div className="row font-playwrite py-20">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <h1 className="my-4">{`User List: `}</h1>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setUsers()}
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

UserList.propTypes = {
  someProp: PropTypes.string,
};

export default UserList;
