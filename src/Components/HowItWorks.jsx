import { FaMapMarkerAlt, FaTruck, FaMoneyBillWave } from "react-icons/fa";

const steps = [
  {
    icon: <FaMapMarkerAlt size={30} className="text-[#CAEB66]" />,
    title: "Booking Pick & Drop",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    icon: <FaMoneyBillWave size={30} className="text-[#CAEB66]" />,
    title: "Cash On Delivery",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    icon: <FaTruck size={30} className="text-[#CAEB66]" />,
    title: "Delivery Hub",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    icon: <FaMapMarkerAlt size={30} className="text-[#CAEB66]" />,
    title: "Booking SME & Corporate",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
];

const HowItWorks = () => {
  return (
    <section className=" py-10 my-5 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
          How it Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 text-center space-y-4 hover:shadow-md transition duration-300"
            >
              <div className="flex justify-center">{step.icon}</div>
              <h3 className="font-semibold text-lg text-gray-800">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
