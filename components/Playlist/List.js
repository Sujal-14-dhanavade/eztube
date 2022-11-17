import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

export default function List(props) {
  return (
    <Grid
      container
      sx={{ width: "100%" }}
      className="bg-dark w-75 m-auto mt-3 p-lg-5 p-md-5 p-1 rounded shadow-lg"
      spacing={1}
    >
      {props.playlistData.length === 0 ? (
        <Typography variant="h5" className="text-center">
          No Playlist Yet!!
        </Typography>
      ) : (
        <React.Fragment>
          {props.playlistData.map((item, idx) => (
            <Grid item lg={4} md={6} xs={12} key={idx}>
              <CardActionArea onClick={() => {
                props.changePlaylist(item);
                props.changePage(false);
              }}>
                <Card sx={{ backgroundColor: "#000" }} className="shadow-lg">
                  <CardMedia
                    component="img"
                    src={`/avatar/playlistPic/${item.playlistPic}`}
                    alt="playlist"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="text-light"
                    >
                      {item.playlistName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="text-light"
                    >
                      <LibraryMusicIcon className="text-danger me-3" />
                      {item.songs.length} Songs
                    </Typography>
                  </CardContent>
                </Card>
              </CardActionArea>
            </Grid>
          ))}
        </React.Fragment>
      )}
    </Grid>
  );
}
