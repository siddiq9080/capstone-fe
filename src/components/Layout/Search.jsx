import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${keyword}`);
  };

  const clearKeyword = () => {
    setKeyword("");
  };

  useEffect(() => {
    if (location.pathname === "/") {
      clearKeyword();
    }
  }, [location]);
  return (
    
    <form onSubmit={searchHandler}>
      <div className="input-group w-16">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          value={keyword}
        />
        <div className="input-group-append">
          <button  className="btn px-4 py-0 m-0">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
