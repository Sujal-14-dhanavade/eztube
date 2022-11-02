import React from "react";
import { Footer } from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { getNameList } from "country-list";

export default function Register() {
  const getDate = () => {
    const date = new Date();
    return date.toISOString().split("T")[0];
  };
  return (
    <div>
      <NavBar CollapseMenu={false} />
      <section className="register-container p-5">
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

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="username"
                              className="form-control register-input-outline"
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
                              type="email"
                              id="email"
                              className="form-control register-input-outline"
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
                            >
                              <option selected>Select Country</option>
                              {Object.keys(getNameList()).map((item, idx) => (
                                <option key={idx} value={item}>
                                  {item}
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
                              className="form-control register-input-outline"
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
                              type="repassword"
                              id="form3Example4cd"
                              className="form-control register-input-outline"
                            />
                            <label className="form-label" htmlFor="repassword">
                              Repeat your password
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="date"
                              id="dob"
                              className="form-control register-input-outline"
                              max={getDate()}
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
                          />
                          <label className="form-check-label" htmlFor="terms">
                            I agree all statements in{" "}
                            <a href="#!" className="text-danger">Terms of service</a>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-danger btn-lg"
                          >
                            Register
                          </button>
                        </div>
                      </form>
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
