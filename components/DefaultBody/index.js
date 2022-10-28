import React from "react";

export default function DefaultBody() {
  return (
    <React.Fragment>
      <div className="homeBody wave-img d-flex flex-column justify-content-center align-items-center">
        <p className="display-2 intro-heading">Ride on Waves</p>
        <p className="text-center intro-body">
          Discover, stream, and share a constantly expanding mix of music from
          emerging and major artists around the world.
        </p>
        <button className="create py-2 px-4 rounded">Sign up for free</button>
      </div>
      <div className="feature container-fluid p-5 bg-light text-center">
        <div className="row">
          <div className="col-md-6 col-sm-12 d-inline-block">
            <img
              src="../images/listening.svg"
              className="feature-img"
              alt="listening"
            />
          </div>
          <div className="col-md-6 col-sm-12 feature-content">
            <p className="feature-heading">Never stop listening</p>
            <p className="feature-body">
              SoundCloud is available on Web, iOS, Android, Sonos, Chromecast,
              and Xbox One.
            </p>
            <div className="row pt-5">
              <div className="col">
                <button className="btn btn-dark p-2">
                  <i className="fa-brands fa-apple"></i>  Download
                </button>
              </div>
              <div className="col">
                <button className="btn btn-dark p-2">
                  <i className="fa-brands fa-google-play"></i>  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
