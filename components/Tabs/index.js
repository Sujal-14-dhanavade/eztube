import React from "react";
import Footer from "../Footer";

export default function Tabs(props) {
  return (
    <div
      className="offcanvas offcanvas-start"
      style={{ backgroundColor: "#000" }}
      data-bs-scroll="true"
      data-bs-backdrop="false"
      tabindex="-1"
      id="offcanvasScrolling"
      aria-labelledby="offcanvasScrollingLabel"
    >
      <div className="offcanvas-header">
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
            });
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
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <div className="input-group">
          <input
            type="search"
            className="form-control bg-black search text-light search"
            id="search"
            name="search"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
          />
          <span
            className="input-group-text border-0 bg-black px-2"
            id="search-addon"
          >
            <i className="fas fa-search red-shade"></i>
          </span>
        </div>
        <div className="d-flex flex-column mt-5 offcanvas-menu-link">
          <a
            className="text-light text-decoration-none fw-bold p-2"
            style={{ cursor: "pointer" }}
            onClick={() => {
              props.toPage({
                account: false,
                setting: false,
                studio: false,
                playlist: false,
                likedSong: false,
              });
            }}
          >
            <i className="fa-solid fa-house pe-3"></i>Home
          </a>
          <a
            className="text-light text-decoration-none fw-bold p-2"
            style={{ cursor: "pointer" }}
            onClick={() => {
              props.toPage({
                account: false,
                setting: false,
                studio: true,
                playlist: false,
                likedSong: false,
              });
            }}
          >
            <i className="fa-solid fa-folder pe-3"></i>Your Library
          </a>
          <a
            className="text-light text-decoration-none fw-bold p-2"
            style={{ cursor: "pointer" }}
            onClick={() => {
              props.toPage({
                account: false,
                setting: false,
                studio: false,
                playlist: true,
                likedSong: false,
              });
            }}
          >
            <i className="fa-solid fa-headphones pe-3"></i>Playlists
          </a>
          <a
            className="text-light text-decoration-none fw-bold p-2"
            style={{ cursor: "pointer" }}
            onClick={() => {
              props.toPage({
                account: false,
                setting: false,
                studio: false,
                playlist: false,
                likedSong: true,
              });
            }}
          >
            <i className="fa-solid fa-thumbs-up pe-3"></i>Liked Songs
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
