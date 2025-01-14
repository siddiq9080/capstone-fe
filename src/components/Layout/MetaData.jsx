import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} - CleanEase`}</title>
    </Helmet>
  );
};

export default MetaData;

MetaData.propTypes = {
  title: PropTypes.string,
};
