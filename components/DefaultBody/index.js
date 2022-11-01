import React from "react";

export default function DefaultBody() {
  return (
    <div>
      {/* HomeBody */}
      <div className="homeBody wave-img d-flex flex-column justify-content-center align-items-center">
        <p className="display-2 intro-heading">Ride on Waves</p>
        <p className="text-center intro-body">
          Discover, stream, and share a constantly expanding mix of music from
          emerging and major artists around the world.
        </p>
        <button className="create py-2 px-4 rounded" data-bs-toggle="modal" data-bs-target="#signUpForm">Sign up for free</button>
      </div>

      {/* Feature */}
      <div className="feature container-fluid bg-light text-center">
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
            <hr className="feature-divider" />
            <p className="feature-body">
              SoundCloud is available on Web, iOS, Android, Sonos, Chromecast,
              and Xbox One.
            </p>
            <div className="pt-5">
              <a className="btn btn-dark p-2 me-3" href="https://www.apple.com/in/store">
                <i className="fa-brands fa-apple"></i> Download
              </a>
              <a className="btn btn-dark p-2" href="https://play.google.com/">
                <i className="fa-brands fa-google-play"></i> Download
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Calling Out */}
      <div className="feature container-fluid bg-stair text-light">
        <div className="row">
          <div className="col-md-6 col-sm-12 d-inline-block my-4">
            <p className="display-6 mt-5">Calling all creators</p>
            <p className="mt-5">
              Get on WaveCloud to connect with fans, share your sounds, and grow your audience. What are you waiting for?
            </p>
          </div>
          <div className="col-md-6 col-sm-12">
            <img className="calling-img" src="../images/creator.jpg" alt="creator" />
          </div>
        </div>
      </div>
    </div>
  );
}
