import React from "react";

export default function Dashboard(props) {

  return (
    <div className="dashboard">
        <h1>{props.data.username}</h1>
    </div>
  );
}