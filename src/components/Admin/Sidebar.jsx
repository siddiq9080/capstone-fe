import { NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column pt-32 md:pt-10 bg-slate-300 px-3 overflow-auto font-playwrite"
      style={{ height: "100vh" }}
    >
      <nav>
        <ul className="list-unstyled p-3">
          <li>
            <Link to="/admin/dashboard" className="text-dark">
              <i className="fas fa-tachometer-alt me-2 "></i> Dashboard
            </Link>
          </li>

          <li>
            <NavDropdown
              title={
                <span>
                  <i className="fa fa-product me-2"></i> Product
                </span>
              }
              className="text-dark"
            >
              <NavDropdown.Item onClick={() => navigate("/admin/productList")}>
                <i className="fa fa-shopping-basket me-2"></i> All
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => navigate("/admin/products/create")}
              >
                <i className="fa fa-plus me-2"></i> Create
              </NavDropdown.Item>
            </NavDropdown>
          </li>
          <br />
          <li>
            <Link to="/admin/orders" className="text-dark">
              <i className="fa fa-shopping-basket me-2"></i> Bookings
            </Link>
          </li>
          <br />
          <li>
            <Link to="/admin/users" className="text-dark">
              <i className="fa fa-users me-2"></i> Users
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
