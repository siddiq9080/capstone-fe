import CompaniesList from "./components/companyProducts/CompaniesList";
import Banner from "./components/Layout/Banner";

import Header from "./components/Layout/Header";
import MetaData from "./components/Layout/MetaData";

const Home = () => {
  return (
    <>
      <MetaData title={"Home"} />
      <Header />
      <div>
        <Banner />
        <section className="bg-slate-300 py-10 my-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Why Choose CleanEase?</h1>
            <p className="text-lg text-gray-700">
              CleanEase is an online platform offering personalized cleaning
              services with flexible scheduling and secure payment options. It
              allows users to easily book, manage, and review cleaning
              appointments based on their preferences.
            </p>
          </div>
        </section>
        <CompaniesList />
      </div>
    </>
  );
};

export default Home;
