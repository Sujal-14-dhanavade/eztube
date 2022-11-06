import React from "react";
import { Fab } from "@mui/material";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";

export default function AppNavbar(props) {
  return (
    <nav className="navbar navbar-expand-md shadow-5">
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
        <Fab
          className="text-light"
          sx={{ backgroundColor: "#fa3434" }}
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling"
          aria-controls="offcanvasScrolling"
          size="small"
        >
          <AudiotrackIcon />
        </Fab>
      </div>
    </nav>
  );
}
