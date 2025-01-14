import { MDBDataTable } from "mdbreact";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userOrdersApi } from "../../Actions/orderAction";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import MetaData from "../Layout/MetaData";

const UserOrder = () => {
  const { userOrders } = useSelector((state) => state.orderState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userOrdersApi);
  }, [dispatch]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Number of Items",
          field: "numOfItems",
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

    userOrders.forEach((userOrder) => {
      data.rows.push({
        id: userOrder._id,
        numOfItems: userOrder.orderItems.length,
        amount: `₹${userOrder.totalPrice}`,
        status:
          // userOrder.orderStatus &&
          userOrder.orderStatus.includes("Completed") ? (
            <p style={{ color: "green" }}> {userOrder.orderStatus} </p>
          ) : (
            <p style={{ color: "red" }}> {userOrder.orderStatus} </p>
          ),
        actions: (
          <Link to={`/order/${userOrder._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };

  return (
    <>
     <MetaData title={"My Orders"} />
      <Header />

      <div className="px-7 font-playwrite">
        <h1 className="pt-28 ">My Bookings</h1>
        <MDBDataTable
          className="px-3"
          bordered
          striped
          hover
          data={setOrders()}
        />
      </div>
      <Footer />
    </>
  );
};

export default UserOrder;
