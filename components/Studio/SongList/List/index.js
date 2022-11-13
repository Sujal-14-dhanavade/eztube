import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CardActionArea } from "@mui/material";

export default function List(props) {
  return (
    <Box sx={{ width: "100%" }} className="bg-dark p-lg-5 p-md-5 p-1 rounded shadow-lg">
      {props.songListData.map((item, idx) => (
        <CardActionArea key={idx}>
          <Card
            className="my-2"
            sx={{ display: "flex", backgroundColor: "#000" }}
          >
            <CardMedia
              component="img"
              sx={{ width: "30%" }}
              src={`/avatar/songPic/${item.songPic}`}
              alt="song Pic"
            />
            <CardContent className="text-light">
              <Typography component="div" variant="h5">
                {item.name}
              </Typography>
              <Typography component="div" variant="h6">
                {props.data.username}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                className="text-light"
              >
                <VisibilityIcon className="me-3" />
                {item.views}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                className="text-light"
              >
                <FavoriteIcon className="me-3 text-danger" />
                {item.likes}
              </Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      ))}
    </Box>
  );
}
{
  /* <Box sx={{ display: "flex", flexDirection: "column" }}>
            
          </Box> */
}
