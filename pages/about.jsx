import Navbar from "../components/NavBar";
import { Typography, TextField, Button } from "@mui/material";
import React from "react";

export default function About() {
  const [data, onData] = React.useState("");
  const onFileChange = (e) => {
    onData(e.target.value);
  };
  return (
    <div>
      <Navbar />
      <Typography variant="h2">
        File Upload
        {data}
      </Typography>
      <form
        action="/api/videoUpload"
        method="POST"
        encType="multipart/form-data"
      >
        <TextField
          variant="standard"
          type={"file"}
          name={"videoFile"}
        ></TextField>
        <br />
        <Button type="submit" variant="outlined">
          Upload File
        </Button>
      </form>
    </div>
  );
}
