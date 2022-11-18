import React from "react";
import Footer from "../Footer";
import Search from "../Search";

export default function Tabs(props) {
  return (
    <div
      className="offcanvas offcanvas-start"
      style={{ backgroundColor: "#000" }}
      data-bs-scroll="true"
      data-bs-backdrop="false"
      id="offcanvasScrolling"
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
              follow: false,
              search: false,
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
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <Search
          changeContent={props.changeContent}
          toPage={props.toPage}
          query={props.query}
          changeQuery={props.changeQuery}
        />
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
                follow: false,
                search: false,
              });
              props.changeQuery("");
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
                follow: false,
                search: false,
              });
              props.changeQuery("");
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
                follow: false,
                search: false,
              });
              props.changeQuery("");
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
                follow: false,
                search: false,
              });
              props.changeQuery("");
            }}
          >
            <i className="fa-solid fa-thumbs-up pe-3"></i>Liked Songs
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
                likedSong: false,
                follow: true,
                search: false,
              });
              props.changeQuery("");
            }}
          >
            <i className="fa-solid fa-fire-flame-curved pe-3"></i>Follow
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
