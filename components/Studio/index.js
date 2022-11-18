import React from "react";
import SongList from "./SongList";
import SongUpload from "./SongUpload";

export default function Studio(props) {
  const [page, toPage] = React.useState(true);
  return (
    <div>
      <section className="rounded-5 mt-3">
        <div className="container-fluid h-100 bg-transparent p-0">
          <div className="justify-content-center p-0">
            <div className="row">
              <div className="navTab col-lg-2 col-md-2 col-12 d-flex flex-lg-column flex-md-column flex-row p-0">
                <a
                  className="nav-link navTab-link p-4"
                  aria-current="page"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    toPage(true);
                  }}
                >
                  <i className="fa-solid fa-microphone-lines me-3"></i>
                  Studio
                </a>
                <a
                  className="nav-link navTab-link p-4"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    toPage(false);
                  }}
                >
                  <i className="fa-solid fa-music me-3"></i>Your Releases
                </a>
              </div>
              {page ? (
                <SongUpload data={props.data} toPage={props.toPage}/>
              ) : (
                <SongList queue={props.queue} changeQueue={props.changeQueue} changeData = {props.changeData} playlistData= {props.playlistData} data={props.data} toPage={props.toPage} changeSrc= {props.changeSrc} audioRef={props.audioRef}/>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
