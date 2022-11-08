import React from "react";
import SongList from "./SongList";
import SongUpload from "./SongUpload";

export default function Studio(props) {
  const [page, toPage] = React.useState(true);
  return (
    <div>
      <section className="rounded-5 mt-3">
        <div className="container-fluid h-100">
          <div className="card rounded-5 studio">
            <div className="card-body p-0">
              <div className="justify-content-center">
                <div className="row">
                  <div class="navTab col-lg-2 col-md-2 col-12 d-flex flex-lg-column flex-md-column flex-row">
                    <a
                      class="nav-link navTab-link p-3"
                      aria-current="page"
                      href="#"
                    >
                      <i
                        class="fa-solid fa-microphone-lines me-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          toPage(true);
                        }}
                      ></i>
                      Studio
                    </a>
                    <a
                      class="nav-link navTab-link p-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        toPage(false);
                      }}
                    >
                      <i class="fa-solid fa-music me-3"></i>Your Releases
                    </a>
                  </div>
                  {page ? (
                    <SongUpload data={props.data} />
                  ) : (
                    <SongList data={props.data} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
