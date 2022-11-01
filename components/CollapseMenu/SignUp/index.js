import React from "react";
import { TextField, Typography } from "@mui/material";
import IsEmail from "isemail";
import axios from "axios";
import { useRouter } from "next/router";
import $ from "jQuery";

export default function SignUp(props) {
  const router = useRouter();
  const [email, changeEmail] = React.useState({
    data: "",
    error: false,
    helper: "",
  });
  const [isLoading, setLoader] = React.useState(false);

  function emailChange(e) {
    if (IsEmail.validate(e.target.value, { errorLevel: false }) === true) {
      changeEmail({ data: e.target.value, error: false, helper: "" });
    } else {
      changeEmail({ data: e.target.value, error: true, helper: "" });
    }
  }

  function validate(e) {
    e.preventDefault();
    if (email.error === true) {
      changeEmail({ ...email, helper: "Email is not valid" });
    } else {
      setLoader(true);
      axios.get(`/api/isEmailAvailable/${email.data}`).then((res) => {
        const data = res.data;
        if (data.available === true) {
          var body = $("body");
          body.removeAttr("style");
          body.removeAttr("class");
          $(".modal-backdrop").remove();
          router.push(`/Register/${email.data}`);
        } else {
          changeEmail({ ...email, helper: "Email is already registered" });
        }
      });
      setLoader(false);
    }
  }

  return (
    <div className="modal fade text-dark" id="signUpForm">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header text-center">
            <h4 className="modal-title w-100 font-weight-bold">Sign up</h4>
            <button
              type="button"
              id="model-close-btn"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <form className="text-center" onSubmit={validate}>
              <TextField
                className="mx-2 mt-4"
                fullWidth
                variant="standard"
                error={email.error}
                type={"email"}
                label={"Your email address"}
                required
                name="email"
                value={email.data}
                onChange={emailChange}
              />
              {isLoading === true ? (
                <div class="spinner-border text-danger" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : null}
              <button
                type="submit"
                className="my-5 btn btn-danger w-100"
              >
                Continue
              </button>
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
