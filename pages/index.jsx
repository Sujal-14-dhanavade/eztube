import Navbar from "../components/NavBar";
import DefaultBody from "../components/DefaultBody";
import Footer from "../components/Footer";
import React from "react";

export default function About() {
  return (
    <div>
      <Navbar CollapseMenu={true} />
      <DefaultBody />
      <Footer />
    </div>
  );
}
