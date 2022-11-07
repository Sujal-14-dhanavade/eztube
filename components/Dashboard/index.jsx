import React from "react";
import AppNavbar from "../AppNavbar";
import Tabs from "../Tabs";
import Account from "../Account";
import Settings from "../Settings";

export default function Dashboard(props) {
  const [account, isAccount] = React.useState(false);
  const [setting, isSetting] = React.useState(false);

  return (
    <div className="dashboard">
      <AppNavbar data={props.data} toAccount={isAccount} toSetting={isSetting}/>
      {account ? (
        <Account data={props.data} />
      ) : setting ? (
        <Settings data={props.data} />
      ) : null}
      <Tabs id="offcanvasScrolling" />
    </div>
  );
}
