import React from "react";
import Marquee from "react-fast-marquee";

import casio from "../../assets/brands/casio.png";
import amazon from "../../assets/brands/amazon.png";
import amazonVector from "../../assets/brands/amazon_vector.png";
import moonstar from "../../assets/brands/moonstar.png";
import randstad from "../../assets/brands/randstad.png";
import startPeople from "../../assets/brands/start-people 1.png";
import star from "../../assets/brands/start.png";

const logos = [
  { src: casio, alt: "Casio" },
  { src: amazon, alt: "Amazon" },
  { src: amazonVector, alt: "Amazon Vector" },
  { src: moonstar, alt: "MoonStar" },
  { src: randstad, alt: "Randstad" },
  { src: startPeople, alt: "Start People" },
  { src: star, alt: "Star" },
];

function ClientsSection() {
  return (
    <section className=" py-8 px-4">
      <div className="max-w-6xl mx-auto text-center border  p-6 rounded">
        <h3 className="text-2xl  font-bold text-[#023737] mb-6">
          We&apos;ve helped thousands of sales teams
        </h3>
        <Marquee pauseOnHover speed={50} gradient={false}>
          {logos.map((logo, idx) => (
            <img
              key={idx}
              src={logo.src}
              alt={logo.alt}
              className="h-10 mx-6 object-contain block"
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

export default ClientsSection;
