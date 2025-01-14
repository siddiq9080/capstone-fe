const Loader = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center bg-slate-100"
      style={{ minHeight: "100vh" }}
    >
      <i
        className="fa-solid fa-spinner fa-spin fa-4x text-warning"
        aria-label="Loading..."
      ></i>
    </div>
  );
};

export default Loader;
