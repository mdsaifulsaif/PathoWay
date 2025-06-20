import { useState } from "react";
import { FaQuoteLeft, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import group5 from "../../assets/Group 5.png"; // Adjust the path as necessary
const testimonials = [
  {
    name: "Awlad Hossin",
    role: "Senior Product Designer",
    text: "A posture corrector works by providing support and gentle alignment to your sh the day.",
  },
  {
    name: "Rasel Ahamed",
    role: "CTO",
    text: "A posture corrector works by providing support and gentle alignment to your shoulders,.",
  },
  {
    name: "Nasir Uddin",
    role: "CEO",
    text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="py-16 px-4  text-center">
      {/* Top Icon */}
      <div className="mb-6 flex justify-center">
        <img
          src={group5} // Replace with your actual image
          alt="Customer icon"
          className="w-50 h-25"
        />
      </div>

      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
        What our customers are saying
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-10">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, reduce pain, and strengthen your body with
        ease!
      </p>

      {/* Testimonial Card */}
      <div className="relative max-w-md mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <FaQuoteLeft className="text-2xl text-teal-600 mb-4" />
          <p className="text-gray-700 text-sm mb-6">
            {testimonials[current].text}
          </p>
          <hr className="border-t border-gray-300 mb-4" />
          <div className="text-left">
            <p className="text-teal-600 font-semibold">
              {testimonials[current].name}
            </p>
            <p className="text-gray-500 text-sm">
              {testimonials[current].role}
            </p>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute -left-10 top-1/2 -translate-y-1/2">
          <button
            onClick={prev}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-200"
          >
            <FaArrowLeft />
          </button>
        </div>
        <div className="absolute -right-10 top-1/2 -translate-y-1/2">
          <button
            onClick={next}
            className="bg-lime-400 p-2 rounded-full shadow hover:bg-lime-300 text-black"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${
              i === current ? "bg-teal-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
