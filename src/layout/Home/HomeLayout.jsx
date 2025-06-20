import React from "react";
import { Outlet } from "react-router";
import Hero from "./Hero";
import HowItWorks from "../../Components/HowItWorks";
import OurServices from "./OurServices";
import ClientsSection from "./ClientsSection";
import ServicesInfo from "./ServicesInfo";
import SatisfactionBanner from "./SatisfactionBanner";
import Testimonials from "./Testimonials";
import Frequentlyqsn from "./Frequentlyqsn";

function HomeLayout() {
  return (
    <div className="">
      <Hero></Hero>
      <HowItWorks></HowItWorks>
      <OurServices></OurServices>
      <ClientsSection></ClientsSection>
      <ServicesInfo></ServicesInfo>
      <SatisfactionBanner></SatisfactionBanner>
      <Testimonials></Testimonials>
      <Frequentlyqsn></Frequentlyqsn>
    </div>
  );
}

export default HomeLayout;
