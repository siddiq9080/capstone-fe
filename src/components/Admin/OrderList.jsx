import { MDBDataTable } from "mdbreact";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Layout/Loader";
import Sidebar from "./Sidebar";
import { adminOrdersApi, deleteOrderApi } from "../../Actions/orderAction";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import MetaData from "../Layout/MetaData";

const OrderList = () => {
  const {
    adminOrders = [],
    loading = true,
    error,
    isOrderDeleted,
  } = useSelector((state) => state.orderState);

  const dispatch = useDispatch();

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Number of Items",
          field: "noOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
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

    adminOrders.forEach((order) => {
      data.rows.push({
        id: order._id,
        noOfItems: order.orderItems.length,
        amount: `₹${order.totalPrice}`,
        status: (
          <p
            style={{
              color: order.orderStatus.includes("Processing") ? "red" : "green",
            }}
          >
            {order.orderStatus}
          </p>
        ),
        actions: (
          <>
            <Link to={`/admin/order/${order._id}`} className="btn btn-primary">
              {" "}
              <i className="fa fa-pencil"></i>
            </Link>
            <Button
              onClick={(e) => deleteHandler(e, order._id)}
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
    dispatch(deleteOrderApi(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      return;
    }
    if (isOrderDeleted) {
      toast.success("Order Deleted Succesfully!");
      return;
    }

    dispatch(adminOrdersApi);
  }, [dispatch, error, isOrderDeleted]);

  return (
    <>
     <MetaData title={"OrderList"} />
      <Header />

      <div className="row font-playwrite pt-20">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <h1 className="my-4">Order List</h1>

          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setOrders()}
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

export default OrderList;
