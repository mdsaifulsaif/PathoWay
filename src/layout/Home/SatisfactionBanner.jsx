import img1 from "../../assets/Layer_1.png";
import group from "../../assets/Group.png";

const SatisfactionBanner = () => {
  return (
    <div className="relative bg-[#00332F] text-white rounded-2xl overflow-hidden px-6 py-10 md:px-16 md:py-20">
      {/* Top Wave Image */}
      <img
        src={group} // Replace with your actual top image
        alt="Wave Background"
        className="absolute top-0 left-0 w-full object-cover z-0"
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-4">
            Merchant and Customer Satisfaction <br /> is Our First Priority
          </h2>
          <p className="text-gray-200 text-sm md:text-base mb-6">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-lime-400 text-black font-semibold px-6 py-2 rounded-full hover:bg-lime-300 transition">
              Become a Merchant
            </button>
            <button className="border border-lime-400 text-lime-400 font-semibold px-6 py-2 rounded-full hover:bg-lime-400 hover:text-black transition">
              Earn with Profast Courier
            </button>
          </div>
        </div>

        {/* Right Parcel Image */}
        <img
          src={img1} // Replace with your actual parcel image
          alt="Parcel Illustration"
          className="w-[600px]"
        />
      </div>
    </div>
  );
};

export default SatisfactionBanner;
