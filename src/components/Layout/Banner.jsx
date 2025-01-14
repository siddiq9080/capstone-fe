const Banner = () => {
  return (
    <div className="pt-24 md:pt-16 md:px-8 rounded-xl font-playwrite bg-slate-50">
      <div className="container mx-auto rounded-md">
        <div className="flex flex-wrap items-center">
          {/* Image Section */}
          <div className="w-full md:w-5/12">
            <img
              src="https://img.freepik.com/free-vector/cleaning-service-items-set-woman-staff-equipment-cartoon-bucket-mop-gloves-apron-rag-cleaner-vacuum-cleaner-washing-vacuum-cleaner-plunger-scrubber-broom-dustpan_575670-2050.jpg"
              alt="Illustration of cleaning equipment and staff"
              className="rounded-md"
            />
          </div>
          {/* Text Section */}
          <div className="w-full md:w-7/12 pt-8 md:pt-0 md:pl-8 text-center">
            <h1 className="text-primary text-4xl font-bold">
              Cleaning and Organizing
            </h1>
            <h1 className="text-primary text-4xl font-bold pt-4">For You</h1>
            <p className="mt-4 text-lg text-gray-600">
              You deserve to surround yourself with clarity and cleanliness.
              Where there is order, there is Tranquility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
