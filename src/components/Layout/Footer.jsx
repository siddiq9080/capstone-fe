import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-10 mt-3">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* Brand Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">CleanEase</h3>
          <p>
            CleanEase offers personalized cleaning services with flexible
            scheduling and secure payment options. Your comfort and convenience
            are our priority.
          </p>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Footer Navigation">
          <h3 className="text-xl font-bold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/orders">My Orders</Link>
            </li>
            <li>
              <Link to="/myProfile">My Profile</Link>
            </li>
          </ul>
        </nav>

        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p>
            Email: support@cleanease.com <br />
            Phone: +123 456 7890 <br />
            Address: 123 CleanEase St., Cleaning City, CL 45678
          </p>
        </div>
      </div>
      <div className="text-center mt-8 text-sm">
        © {new Date().getFullYear()} CleanEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
