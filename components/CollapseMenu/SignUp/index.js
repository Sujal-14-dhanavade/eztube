import React from "react";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import $ from "jQuery";

export default function SignUp(props) {
  const router = useRouter();
  
  function validate(e) {
    e.preventDefault();
    var body = $("body");
    body.removeAttr("style");
    body.removeAttr("class");
    $(".modal-backdrop").remove()
    router.push(`/Register`);
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
              <div className="display-1 text-danger"><i className="fa-solid fa-right-to-bracket"></i></div>
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
