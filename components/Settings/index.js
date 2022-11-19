import React from "react";
import { getNameList } from "country-list";
import IsEmail from "isemail";
import axios from "axios";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";

export default function Settings(props) {
  const [data, changeData] = React.useState(props.data);
  const getDate = () => {
    const date = new Date();
    return date.toISOString().split("T")[0];
  };

  const [error, setError] = React.useState("");

  const onChange = (e) => {
    changeData({ ...data, [e.target.id]: e.target.value });
  };

  const isEmpty = () => {
    if (
      data.username === "" ||
      data.email === "" ||
      data.dob === "" ||
      data.country === ""
    )
      return true;
    else {
      return false;
    }
  };

  const isDataSame = () => {
    const { username, email, dob, country } = props.data;
    if (
      data.username === username &&
      data.email === email &&
      data.dob === dob &&
      data.country === country
    )
      return true;
    else {
      return false;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isEmpty()) {
      setError("Empty Fields!! Please fill the form");
    } else if (data.username.length < 7) {
      setError("Username should be contain more than 6 characters");
    } else if (!IsEmail.validate(data.email, false)) {
      setError("Please enter valid email");
    } else if (isDataSame()) {
      setError("No Changes made");
    } else {
      axios
        .request({
          method: "POST",
          url: "/api/updateInfo",
          data: data,
        })
        .then((res) => {
          if (res.data.keyValue) {
            if (res.data.keyValue.username) {
              setError("Username already exists!!!");
            } else if (res.data.keyValue.email) {
              setError("Email already exists!!!");
            }
          } else if (res.data.update) {
            setError("Updated");
          } else {
            setError("Server Error");
          }
        });
    }
  };
  return (
    <div style={{marginBottom: "100px"}}>
      <section className="py-5 rounded-5">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-12 col-xl-11">
              <div className="card rounded-5 settings">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="px-5">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Update Settings
                      </p>
                      <form onSubmit={onSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="username"
                              name="username"
                              className="form-control register-input-outline"
                              value={data.username}
                              onChange={onChange}
                            />
                            <label className="form-label" htmlFor="username">
                              Username
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="email"
                              name="email"
                              className="form-control register-input-outline"
                              value={data.email}
                              onChange={onChange}
                            />
                            <label className="form-label" htmlFor="email">
                              Your Email
                            </label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fa-solid fa-earth-americas fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <select
                              className="form-select register-input-outline"
                              id="country"
                              name="country"
                              value={data.country}
                              onChange={onChange}
                            >
                              <option defaultValue={""}></option>
                              {Object.keys(getNameList()).map((item, idx) => (
                                <option key={idx} value={item.toUpperCase()}>
                                  {item.toUpperCase()}
                                </option>
                              ))}
                            </select>
                            <label className="form-label" htmlFor="country">
                              Country
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fa-solid fa-cake-candles fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="date"
                              id="dob"
                              name="dob"
                              className="form-control register-input-outline"
                              max={getDate()}
                              value={data.dob.split("T")[0]}
                              onChange={onChange}
                            />
                            <label className="form-label" htmlFor="dob">
                              Date of Birth
                            </label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          {error ? (
                            <Alert
                              severity={
                                error === "No Changes made"
                                  ? "info"
                                  : error === "Updated"
                                  ? "success"
                                  : "error"
                              }
                            >
                              {error}
                            </Alert>
                          ) : null}
                        </div>

                        <div className="d-flex mx-4 mb-3 mb-lg-4 justify-content-center">
                          <button
                            type="submit"
                            className="btn btn-danger mx-3 p-2"
                          >
                            Save Changes
                          </button>
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
                      </form>
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
