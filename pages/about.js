import Navbar from "../components/NavBar"
import {Typography, TextField} from "@mui/material";
import React from "react";

export default function About() {
    const [data, onData] = React.useState("");
    const onFileChange = (e) => {
      onData(e.target.value);
    }
    return (
      <div>
      <Navbar />
            <Typography variant="h2">
              File Upload
              {data}
            </Typography>
            <TextField type="file" onChange={onFileChange}/>

      </div>
                  
    )
  }
  