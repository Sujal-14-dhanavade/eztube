import React from "react";
import CollapseMenu from "../CollapseMenu";

const Navbar = (props) => {
    
  return (
    <nav className="navbar navbar-expand-md">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img
            src="../images/wave.png"
            alt="waveCloud Logo"
            className="brand-logo d-inline-block align-text-center"
          />
          <h1 className="brand-name d-inline-block align-text-top mx-3">
            WaveCloud
          </h1>
        </a>
        {(props.CollapseMenu === false)? null : < CollapseMenu />} 
      </div>
    </nav>
  );
};

export default Navbar;
