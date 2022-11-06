import React, { useState } from "react";
import { TextField, Typography } from "@mui/material";
import { Router, useRouter } from "next/router";
import axios from "axios";
import $ from "jQuery";

export default function SignIn() {
  const [data, changeData] = React.useState({
    username: "",
    password: "",
  });

  const router = useRouter();

  const [error, setError] = React.useState("");
  const isEmpty = () => {
    for (var i in data) {
      if (data[i] === "") return true;
    }
    return false;
  };

  const onChange = (e) => {
    changeData({ ...data, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const regPass =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (isEmpty()) {
      setError("Empty Fields!! Please fill the form");
    } else if (data.username.length < 7) {
      setError("Username should be contain more than 6 characters");
    } else if (!data.password.match(regPass)) {
      setError(
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    } else {
      axios
        .request({
          method: "POST",
          url: "/api/login",
          data: data,
        })
        .then((res) => {
          if (res.data.isAuth) {
            var body = $("body");
            body.removeAttr("style");
            body.removeAttr("class");
            $(".modal-backdrop").remove()
            router.push("/Ezport");
          } else if (!res.data.isAuth) {
            setError("Username or Password wrong");
          } else if (res.data.error) {
            setError("Server Error");
          }
        });
    }
  };
  return (
    <div className="modal fade text-dark" id="signInForm">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header text-center">
            <h4 className="modal-title w-100 font-weight-bold">Sign in</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <form className="text-center" onSubmit={onSubmit}>
              <TextField
                onChange={onChange}
                value={data.username}
                className="mx-2"
                fullWidth
                variant="standard"
                type={"text"}
                label={<i className="fa-solid fa-user"></i>}
                required
                name="username"
                id="username"
              />
              <TextField
                onChange={onChange}
                value={data.password}
                className="mx-2 mt-4"
                fullWidth
                variant="standard"
                type={"password"}
                label={<i className="fa-solid fa-key"></i>}
                name="password"
                id="password"
                required
              />
              <button type="submit" className="my-5 btn btn-danger w-100">
                Continue
              </button>
              <Typography variant="caption" className="d-block text-danger">
                {error}
              </Typography>
              <Typography variant="caption" className="d-block">
                When registering, you agree that we may use your provided data
                for the registration and to send you notifications on our
                products and services. You can unsubscribe from notifications at
                any time in your settings. For additional info please refer to
                our Privacy Policy.
              </Typography>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
