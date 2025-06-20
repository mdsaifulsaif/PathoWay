import React from "react";
import { Outlet } from "react-router";
import Hero from "./Hero";
import HowItWorks from "../../Components/HowItWorks";
import OurServices from "./OurServices";

function HomeLayout() {
  return (
    <div className="">
      <Hero></Hero>
      <HowItWorks></HowItWorks>
      <OurServices></OurServices>
    </div>
  );
}

export default HomeLayout;
