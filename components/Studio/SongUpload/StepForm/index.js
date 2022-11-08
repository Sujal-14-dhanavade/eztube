import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import axios from "axios";
import AlbumSelectForm from "./albumSelectForm";
import AlbumCreateForm from "./AlbumCreateForm";

const steps = ["Set a Album", "Upload Song"];

export default function StepForm(props) {
  const [albumSelect, changeSelect] = React.useState(true);
  const [albumId, setAlbum] = React.useState({
    id: "",
    album: "",
  });
  const [userAlbums, setUserAlbums] = React.useState([]);

  useEffect(() => {
    axios
      .request({
        method: "POST",
        url: "/api/getAlbums",
      })
      .then((res) => {
        setUserAlbums(res.data);
      });
  }, []);

  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Box sx={{ width: "100%" }} className="bg-dark p-5 rounded shadow-lg">
      <Stepper activeStep={activeStep} className="bg-light p-3 rounded" sx={{}}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div className="container-fluid">
        <Typography variant="h6" className="p-3 text-center">
          <i class="fa-solid fa-record-vinyl me-3"></i>Select a Album
        </Typography>
      </div>
      {albumSelect ? (
        <AlbumSelectForm userAlbums={userAlbums} toChange={changeSelect} album={setAlbum}/>
      ) : (
        <AlbumCreateForm toChange={changeSelect} album={setAlbum}/>
      )}
    </Box>
  );
}
