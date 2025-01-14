import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { logoutApi } from "../../Actions/authAction";
import { useEffect } from "react";

function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { items: cartItems = [] } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutApi);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Navbar expand="lg" className="bg-white w-100 position-fixed z-50">
      <Container fluid className="d-flex justify-content-between">
        {/* Left Side - Brand Name or Icon */}
        <Link to="/" className="navbar-brand">
          <i>CleanEase</i>
        </Link>

        <Search />

        {/* Right Side - Navbar Links and Dropdown */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link
              onClick={() => {
                navigate("/myProfile");
              }}
              className="text-dark"
            >
              MyProfile
            </Nav.Link>

            {user?.role === "admin" && (
              <Nav.Link
                onClick={() => {
                  navigate("/admin/dashboard");
                }}
                className="text-dark"
              >
                Dashboard
              </Nav.Link>
            )}

            <Nav.Link
              onClick={() => {
                navigate("/orders");
              }}
              className="text-dark"
            >
              My Bookings
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
              className="text-dark"
            >
              Cart <span className="badge bg-primary">{cartItems.length}</span>
            </Nav.Link>

            {isAuthenticated ? (
              <Nav.Link
                className="bg-red-500 rounded-xl font-semibold text-white"
                onClick={logoutHandler}
              >
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link
                className="bg-green-500 rounded-xl font-semibold text-white"
                onClick={() => navigate("/login")}
              >
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
