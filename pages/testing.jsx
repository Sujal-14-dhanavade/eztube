import React from "react";

export default function About() {
  
  return (
    <React.Fragment>
      <form action="/api/songPicUpload" method="POST" encType="multipart/form-data">
        <input type="file" name="songPicFile"/>
        <button className="btn btn-primary" type={"submit"}>Submit</button>
      </form>
      <img src = "/avatar/songPic/635938284ea09958e1f2b6d4" />
    </React.Fragment>
  );
}
