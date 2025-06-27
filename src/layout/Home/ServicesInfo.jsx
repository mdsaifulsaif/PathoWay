import { FaMapMarkedAlt, FaShieldAlt, FaPhoneAlt } from "react-icons/fa";
import img1 from "../../assets/live-tracking.png";

const ServicesInfo = () => {
  const services = [
    {
      icon: <FaMapMarkedAlt className="text-teal-600 text-4xl" />,
      title: "Live Parcel Tracking",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
    },
    {
      icon: <FaShieldAlt className="text-teal-600 text-4xl" />,
      title: "100% Safe Delivery",
      description:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    },
    {
      icon: <FaPhoneAlt className="text-teal-600 text-4xl" />,
      title: "24/7 Call Center Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-6">
      {services.map((service, index) => (
        <div
          key={index}
          className="flex items-start justify-center gap-4 p-6 bg-white rounded-lg shadow-sm border"
        >
          {/* <div className="shrink-0">{service.icon}</div> */}
          <div className="">
            <img src={img1} alt="" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm mt-1">{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesInfo;
