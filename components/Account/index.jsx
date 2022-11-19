import { Avatar } from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";

export default function Account(props) {
  return (
    <div style={{marginBottom: "100px"}}>
      <section className="py-5">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-12 col-xl-11">
              <div className="card rounded-5 register">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Account Overview
                      </p>
                      <div className="container-fluid d-flex flex-row justify-content-center">
                        <div className="d-flex flex-column">
                          <div className="response">
                            <span className="me-3 label fw-bold">Username</span>
                          </div>
                          <div className="response">
                            <span className="me-3 label fw-bold">Email</span>
                          </div>
                          <div className="response">
                            <span className="me-3 label fw-bold">Origin</span>
                          </div>
                          <div className="response">
                            <span className="me-3 label fw-bold">
                              Followers
                            </span>
                          </div>
                          <div className="response">
                            <span className="me-3 label fw-bold">Verified</span>
                          </div>
                        </div>
                        <div className="d-flex flex-column">
                          <div className="response">
                            <span>{props.data.username}</span>
                          </div>
                          <div className="response">
                            <span>{props.data.email}</span>
                          </div>
                          <div className="response">
                            <span>{props.data.country}</span>
                          </div>
                          <div className="response">
                            <span>{props.data.followers}</span>
                          </div>
                          <div className="response">
                            <span>{props.data.verified ? "Yes" : "No"}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5">
                        <a
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
                          className="btn btn-danger mx-3 p-2"
                        >
                          Go Back &#9758;
                        </a>
                      </div>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex justify-content-center order-1 order-lg-2">
                      {props.data.userPic ? (
                        <Avatar
                          alt="userAvatar"
                          src={`/avatar/userPic/${props.data.userPic}`}
                          sx={{ width: 300, height: 300 }}
                        />
                      ) : (
                        <Avatar
                          alt="userAvatar"
                          sx={{ width: 300, height: 300 }}
                        >
                          <PersonIcon sx={{ fontSize: "100px" }} />
                        </Avatar>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
