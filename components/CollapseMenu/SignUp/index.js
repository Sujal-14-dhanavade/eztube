import React from "react";
import {TextField, Typography} from '@mui/material';


export default function SignUp() {
  return (
    <div class="modal fade text-dark" id="signUpForm">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header text-center">
            <h4 class="modal-title w-100 font-weight-bold">Sign up</h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form action="/" method="POST" className="text-center">
                <TextField className="mx-2 mt-4" fullWidth variant="standard" type={"email"} label={"Your email address"} required name="email"/>
                <button type="submit" className="my-5 btn btn-danger w-100">Continue</button>
                <Typography variant="caption" className="d-block">When registering, you agree that we may use your provided data for the registration and to send you notifications on our products and services. You can unsubscribe from notifications at any time in your settings. For additional info please refer to our Privacy Policy.</Typography>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
