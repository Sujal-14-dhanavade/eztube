import React from "react";
import {TextField, Typography} from '@mui/material';


export default function SignIn() {
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
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form action="/" method="POST" className="text-center">
                <TextField className="mx-2" fullWidth variant="standard" type={"text"} label={<i className="fa-solid fa-user"></i>} required name="username"/>
                <TextField className="mx-2 mt-4" fullWidth variant="standard" type={"password"} label={<i className="fa-solid fa-key"></i>} name="password" required/>
                <button type="submit" className="my-5 btn btn-danger w-100">Continue</button>
                <Typography variant="caption" className="d-block">When registering, you agree that we may use your provided data for the registration and to send you notifications on our products and services. You can unsubscribe from notifications at any time in your settings. For additional info please refer to our Privacy Policy.</Typography>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
