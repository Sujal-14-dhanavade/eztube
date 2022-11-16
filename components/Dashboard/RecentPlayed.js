import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

export default function RecentPlayed(props) {
  return (

    <Container className="p-lg-4 p-md-4 p-1 bg-dark rounded shadow-lg">
        <Typography variant="h5" className="text-left">
            Recent Played
        </Typography>
        
    </Container>
  )
}
