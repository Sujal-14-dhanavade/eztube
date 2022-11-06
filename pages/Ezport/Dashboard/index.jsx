import React from "react";
import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";

export default function Dashboard(props) {

  return (
    <div className="dashboard">
      <NavBar CollapseMenu = {false}/>
      <Footer /> 
    </div>
  );
}