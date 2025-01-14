import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

import { registerApi } from "../../Actions/authAction";
import Loader from "../Layout/Loader";
import MetaData from "../Layout/MetaData";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.authState
  );

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name cannot exceed 50 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      dispatch(registerApi(values));
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      toast.success(`Registration successful, Welcome ${user.name}!`);
      navigate("/");
    }

    if (error) {
      toast.error(error);
    }
  }, [error, isAuthenticated, dispatch, navigate, user]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="font-playwrite card mt-16 py-5 w-10/12 mx-auto">
      <MetaData title={"Register"} />
      <h1 className="text-center font-bold  ">Register</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="w-11/12 md:w-7/12 mx-auto"
      >
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            className={`form-control ${
              formik.touched.name && formik.errors.name ? "border-red-500" : ""
            }`}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-xs italic">{formik.errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className={`form-control ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : ""
            }`}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs italic">{formik.errors.email}</p>
          )}
        </div>

        {/* Phone Field */}
        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Phone:
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="Enter phone number"
            className={`form-control ${
              formik.touched.phone && formik.errors.phone
                ? "border-red-500"
                : ""
            }`}
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-500 text-xs italic">{formik.errors.phone}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            className={`form-control ${
              formik.touched.password && formik.errors.password
                ? "border-red-500"
                : ""
            }`}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-xs italic">
              {formik.errors.password}
            </p>
          )}
        </div>
        <div className="mx-auto">
          <button
            type="submit"
            className="btn btn-primary w-9/12   mt-4"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>{" "}
        here.
      </p>
    </div>
  );
};

export default Register;
