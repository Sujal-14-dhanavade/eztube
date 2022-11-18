import React from "react";
import { Fab, Avatar } from "@mui/material";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";

export default function AppNavbar(props) {
  function logout() {
    axios.request({
      method: "POST",
      url: "/api/logout",
    });
  }
  return (
    <nav id="#" className="navbar navbar-expand-md shadow-5">
      <div className="container d-flex flex-row">
        <a
          className="navbar-brand me-5"
          style={{ cursor: "pointer" }}
          onClick={() => {
            props.toPage({
              account: false,
              setting: false,
              studio: false,
              playlist: false,
              likedSong: false,
              follow: false,
              search: false
            });
            props.changeQuery("");
          }}
        >
          <img
            src="../images/wave.png"
            alt="waveCloud Logo"
            className="brand-logo d-inline-block align-text-center"
          />
          <h1 className="brand-name d-inline-block align-text-top mx-3">
            WaveCloud
          </h1>
        </a>
        <button
          className="navbar-toggler red-shade outline-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="fa-solid fa-bars-staggered"></span>
        </button>
        <div
          className="collapse navbar-collapse toggle-list"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav align-items-center">
            <li className="nav-item dropdown me-lg-5 me-md-5">
              <a
                className="nav-link"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {props.data.userPic ? (
                  <Avatar
                    alt="userAvatar"
                    src={`/avatar/userPic/${props.data.userPic}`}
                  />
                ) : (
                  <Avatar alt="userAvatar">
                    <PersonIcon sx={{ fontSize: "50px" }} />
                  </Avatar>
                )}
              </a>
              <ul className="dropdown-menu bg-dark mt-3">
                <li>
                  <a
                    className="dropdown-item text-light py-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      props.toPage({
                        account: true,
                        setting: false,
                        studio: false,
                        playlist: false,
                        likedSong: false,
                        follow: false,
                        search: false
                      });
                      props.changeQuery("");
                    }}
                  >
                    <PersonIcon /> Account
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item text-light py-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      props.toPage({
                        account: false,
                        setting: true,
                        studio: false,
                        playlist: false,
                        likedSong: false,
                        follow: false,
                        search: false
                      });
                      props.changeQuery("");
                    }}
                  >
                    <SettingsIcon /> Setting
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item me-lg-5 me-md-5">
              <Fab
                className="text-light"
                color="warning"
                sx={{ backgroundColor: "#fa3434", zIndex: 0 }}
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasScrolling"
                aria-controls="offcanvasScrolling"
                size="small"
              >
                <AudiotrackIcon />
              </Fab>
            </li>
            <li className="nav-item">
              <Fab
                className="text-light"
                color="error"
                sx={{ backgroundColor: "#000", zIndex: 0 }}
                onClick={logout}
                size="small"
              >
                <LogoutIcon />
              </Fab>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
