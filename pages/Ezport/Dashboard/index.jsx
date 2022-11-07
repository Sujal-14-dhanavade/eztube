import React from "react";
import AppNavbar from "../../../components/AppNavbar";
import Tabs from "../../../components/Tabs";
import Account from "../Account";

export default function Dashboard(props) {
  const [account, isAccount] = React.useState(false);

  return (
    <div className="dashboard">
      <AppNavbar data={props.data} toAccount = {isAccount}/>
        {account? <Account data={props.data}/>: null}
      <Tabs id="offcanvasScrolling"/>
    </div>
  );
}