import React from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import IsEmail from "isemail";
import axios from "axios";
import { Details } from "../../components/Details";
import Pic from "../../components/Pic";

export default function Register() {
  const [data, changeData] = React.useState({
    username: "",
    email: "",
    country: "",
    password: "",
    repassword: "",
    dob: "",
    terms: "",
  });

  const [isUserPic, changeUserPic] = React.useState({
    _id: null,
    change: false,
  });

  const [error, setError] = React.useState("");
  const isEmpty = () => {
    for (var i in data) {
      if (data[i] === "") return true;
    }
    return false;
  };

  const getDate = () => {
    const date = new Date();
    return date.toISOString().split("T")[0];
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
    } else if (data.username.length < 8) {
      setError("Username should be contain more than 7 characters");
    } else if (!IsEmail.validate(data.email, false)) {
      setError("Please enter valid email");
    } else if (!data.password.match(regPass)) {
      setError(
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    } else if (data.password !== data.repassword) {
      setError("Password is not confirmed correctly");
    } else if (data.terms !== "accepted") {
      setError("Please accept the terms and conditions");
    } else {
      axios
        .request({
          method: "POST",
          url: "/api/register",
          data: data,
        })
        .then((res) => {
          if (res.data.keyValue) {
            if (res.data.keyValue.username) {
              setError("Username already exists!!!");
            } else if (res.data.keyValue.email) {
              setError("Email already exists!!!");
            }
          } else if (res.data._id) {
            changeData({
              username: "",
              email: "",
              country: "",
              password: "",
              repassword: "",
              dob: "",
              terms: "",
            });
            setError("");
            changeUserPic({ _id: res.data._id, change: true});
          } else {
            setError("Server Error");
          }
        });
    }
  };

  return (
    <div>
      <NavBar CollapseMenu={false} />
      <section className="register-container py-5">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-12 col-xl-11">
              <div className="card rounded-5 register">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>
                      {isUserPic.change === false ? (
                        <Details
                          onSubmit={onSubmit}
                          data={data}
                          onChange={onChange}
                          error={error}
                          getDate={getDate}
                        />
                      ) : (
                        <Pic data={isUserPic._id}/>
                      )}
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="../images/register.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
