import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";
import { useEffect, useState } from "react";
import { myProfileApi } from "./Actions/authAction.js";
import store from "./store/store.js";
import Home from "./Home.jsx";
import CompanyProductsDetail from "./components/companyProducts/CompanyProductsDetail.jsx";
import CompanyProducts from "./components/companyProducts/CompanyProducts.jsx";
import ProductsSearch from "./components/product/ProductsSearch.jsx";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.jsx";
import ProductDetail from "./components/product/ProductDetail.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import Cart from "./components/cart/Cart.jsx";
import Shipping from "./components/cart/Shipping.jsx";
import ConfirmOrder from "./components/cart/ConfirmOrder.jsx";
import Payment from "./components/cart/Payment.jsx";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/cart/OrderSuccess.jsx";
import UserOrder from "./components/order/UserOrder.jsx";
import OrderDetail from "./components/order/OrderDetail.jsx";
import Dashboard from "./components/Admin/Dashboard.jsx";
import ProductList from "./components/Admin/ProductList.jsx";
import CreateNewProduct from "./components/Admin/CreateNewProduct.jsx";
import UpdateProduct from "./components/Admin/UpdateProduct.jsx";
import OrderList from "./components/Admin/OrderList.jsx";
import UpdateOrder from "./components/Admin/UpdateOrder.jsx";
import UserList from "./components/Admin/UserList.jsx";
import UpdateUser from "./components/Admin/UpdateUser.jsx";
import Cookies from "js-cookie";
import UserProfile from "./components/auth/UserProfile.jsx";
import { HelmetProvider } from "react-helmet-async";

const App = () => {
  const BE_URL = import.meta.env.VITE_BE_URL;
  axios.defaults.withCredentials = true;

  // Set Authorization header globally for all Axios requests

  axios.defaults.headers.common["Authorization"] = Cookies.get("token")
    ? `Bearer ${Cookies.get("token")}`
    : "";

  const [stripeApiKey, setStripeApiKey] = useState("");
  useEffect(() => {
    store.dispatch(myProfileApi());

    async function getStripeApiKey() {
      const response = await axios.get(`${BE_URL}/sendStripeApi`);
      setStripeApiKey(response.data.stripeApiKey);
    }
    getStripeApiKey();
  }, [BE_URL]);

  return (
    <div className="font-playwrite">
      <BrowserRouter>
        <HelmetProvider>
          <ToastContainer theme="dark" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/company/:companyId/product/:productId"
              element={
                <ProtectedRoute>
                  <CompanyProductsDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/company/:id"
              element={
                <ProtectedRoute>
                  <CompanyProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myProfile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search/:keyword"
              element={
                <ProtectedRoute>
                  <ProductsSearch />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <UserOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProtectedRoute>
                  <ProductDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shipping"
              element={
                <ProtectedRoute>
                  <Shipping />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order/success"
              element={
                <ProtectedRoute>
                  <OrderSuccess />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order/confirm"
              element={
                <ProtectedRoute>
                  <ConfirmOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<PageNotFound />} />
            {stripeApiKey && (
              <Route
                path="/payment"
                element={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                }
              />
            )}

            {/* Admin Routes */}

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute isAdmin={true}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/productList"
              element={
                <ProtectedRoute isAdmin={true}>
                  <ProductList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/products/create"
              element={
                <ProtectedRoute isAdmin={true}>
                  <CreateNewProduct />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/product/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UpdateProduct />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute isAdmin={true}>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/order/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UpdateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UserList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/user/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UpdateUser />
                </ProtectedRoute>
              }
            />
          </Routes>
        </HelmetProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
