import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CompanyCard = ({ _id, companyName, image, description }) => {
  return (
    <div className="card" style={{ height: 450 }}>
      <div className="card-img-top h-48 w-full">
        <Link to={`/company/${_id}`}>
          <img
            style={{ height: 200 }}
            src={image}
            alt={companyName}
            className="object-cover h-full w-full"
          />
        </Link>
      </div>
      <div className="card-body text-center p-3">
        <Link to={`/company/${_id}`}>
          {" "}
          <h4 className="font-bold pt-3 text-black">{companyName}</h4>
        </Link>
        <p className="text-start pt-3">{description}</p>
      </div>
      <Link to={`/company/${_id}`}>
        <div className="text-center hover:scale-110 transition-all my-2">
          <button className="btn btn-primary rounded-5 ">View Details</button>
        </div>
      </Link>
    </div>
  );
};

export default CompanyCard;

CompanyCard.propTypes = {
  _id: PropTypes.string,
  companyName: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
};
