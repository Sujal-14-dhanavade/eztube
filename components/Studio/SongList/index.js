import React, { useEffect } from "react";
import List from "./List";
import axios from "axios";

export default function SongList(props) {
  const [songListData, changeData] = React.useState(null);
  useEffect(() => {
    axios.request({
      method: "GET",
      url: "/api/getSongs"
    }).then(res => {
      changeData(res.data);
    });
  }, []);
  return (
    <div className="content col-lg-10 col-md-10 col-12 d-flex flex-column p-lg-5 p-md-5" style={{marginBottom: "100px"}}>
      <h1 className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
        <img src="../images/studioLogo.png" height={100} width={100}></img>
        Releases
      </h1>
      {songListData ? <List data={props.data} queue={props.queue} changeQueue={props.changeQueue} changeData = {props.changeData} playlistData= {props.playlistData} songListData = {songListData} changeSrc={props.changeSrc} audioRef={props.audioRef}/>: null}
    </div>
  );
}
