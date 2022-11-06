import React from "react";
import AppNavbar from "../../../components/AppNavbar";
import Tabs from "../../../components/Tabs";

export default function Dashboard(props) {

  return (
    <div className="dashboard">
      <AppNavbar data={props.data}/>
      <Tabs id="offcanvasScrolling" />
    </div>
  );
}