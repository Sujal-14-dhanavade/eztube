import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import RecentPlayed from "./RecentPlayed";
import LightModeIcon from "@mui/icons-material/LightMode";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import TopCharts from "./TopCharts";
import TopUser from "./TopUser";
import { PowerInputSharp } from "@mui/icons-material";

export default function Home(props) {
  const getGreeting = () => {
    var myDate = new Date();
    var hrs = myDate.getHours();
    if (hrs < 12)
      return (
        <>
          <LightModeIcon className="text-warning me-3" />
          Good Morning
        </>
      );
    else if (hrs >= 12 && hrs <= 17)
      return (
        <>
          <EmojiFoodBeverageIcon className="text-danger me-3" />
          Good Afternoon
        </>
      );
    else if (hrs >= 17 && hrs <= 24)
      return (
        <>
          <DarkModeIcon className="me-3" />
          Good Evening
        </>
      );
  };

  return (
    <div>
      <Container className="p-lg-5 p-md-5 p-0 mt-5" sx={{marginBottom: "100px"}}>
        <Typography
          variant="h4"
          className="text-center fw-bolder mb-4"
          sx={{ letterSpacing: "5px" }}
        >
          {getGreeting()}
        </Typography>
        <RecentPlayed
          queue={props.queue}
          changeQueue={props.changeQueue}
          data={props.data.recent_Played}
          LikedData={props.data.liked_songs}
        />
        <TopCharts
          queue={props.queue}
          changeQueue={props.changeQueue}
          LikedData={props.data.liked_songs}
          playlistData={props.playlistData}
          changeData={props.changeData}
        />
        <TopUser
          setPage={props.setPage}
          followData={props.followData}
          changeQueue={props.changeQueue}
          changeTurn={props.changeTurn}
          audioRef={props.audioRef}
          changeSrc={props.changeSrc}
        />
      </Container>
    </div>
  );
}
