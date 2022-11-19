import React from "react";
import StepForm from "./StepForm";

export default function SongUpload(props) {
  
  return (
    <div className="content col-lg-10 col-md-10 col-12 d-flex flex-column p-5" style={{marginBottom: "100px"}}>
      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
        <img src="../images/studioLogo.png" height={100} width={100}></img>
        Studio
      </p>
      <StepForm toPage={props.toPage}/>
    </div>
  );
}