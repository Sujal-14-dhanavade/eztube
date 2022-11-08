import React from "react";
import { getNameList } from "country-list";
import { Alert } from "@mui/material";

export function Details(props) {
  return (
    <form className="mx-1 mx-md-4" onSubmit={props.onSubmit}>
      <div className="d-flex flex-row align-items-center mb-4">
        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
        <div className="form-outline flex-fill mb-0">
          <input
            type="text"
            id="username"
            name="username"
            className="form-control register-input-outline"
            value={props.data.username}
            onChange={props.onChange}
          />
          <label className="form-label" htmlFor="username">
            User Name / Handler
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
            value={props.data.email}
            onChange={props.onChange}
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
            value={props.data.country}
            onChange={props.onChange}
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
        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
        <div className="form-outline flex-fill mb-0">
          <input
            type="password"
            id="password"
            name="password"
            className="form-control register-input-outline"
            value={props.data.password}
            onChange={props.onChange}
          />
          <label className="form-label" htmlFor="password">
            Password
          </label>
        </div>
      </div>

      <div className="d-flex flex-row align-items-center mb-4">
        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
        <div className="form-outline flex-fill mb-0">
          <input
            type="password"
            id="repassword"
            name="repassword"
            className="form-control register-input-outline"
            value={props.data.repassword}
            onChange={props.onChange}
          />
          <label className="form-label" htmlFor="repassword">
            Repeat your password
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
            max={props.getDate()}
            value={props.data.dob}
            onChange={props.onChange}
          />
          <label className="form-label" htmlFor="dob">
            Date of Birth
          </label>
        </div>
      </div>

      <div className="form-check d-flex justify-content-center mb-5">
        <input
          className="form-check-input me-2 register-input-outline"
          type="checkbox"
          value="accepted"
          id="terms"
          onChange={props.onChange}
        />
        <label className="form-check-label" htmlFor="terms">
          I agree all statements in{" "}
          <a href="#!" className="text-danger">
            Terms of service
          </a>
        </label>
      </div>

      <div className="d-flex justify-content-center mb-3 mb-lg-4">
        {props.error? <Alert severity="error">{props.error}</Alert>: null}
      </div>

      <div className="d-flex mx-4 mb-3 mb-lg-4 justify-content-center">
        <button type="submit" className="btn btn-danger mx-3 p-2">
          Register
        </button>
        <a href="/" className="btn btn-danger mx-3 p-2">
              Go Back &#9758;
        </a>
      </div>
    </form>
  );
}
