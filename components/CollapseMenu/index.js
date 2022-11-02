import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function collapseMenu() {
  return (
    <React.Fragment>
      <button
        className="navbar-toggler red-shade outline-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <i className="fa-solid fa-bars-staggered"></i>
      </button>
      <div className="collapse navbar-collapse toggle-list" id="navbarNav">
        <ul className="navbar-nav">
          <li className="mx-md-2 mx-lg-2 my-md-auto my-lg-auto my-3">
            <button
              className="signIn rounded"
              data-bs-toggle="modal"
              data-bs-target="#signInForm"
            >
              Sign in
            </button>
            <SignIn />
          </li>
          <li className="mx-md-4 mx-lg-4 my-md-auto my-lg-auto my-3">
            <button
              className="create rounded"
              data-bs-toggle="modal"
              data-bs-target="#signUpForm"
            >
              Create account
            </button>
            <SignUp />
          </li>
          <li className="navbar-text d-none d-md-flex d-lg-flex align-items-center">
            For Creators
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}
