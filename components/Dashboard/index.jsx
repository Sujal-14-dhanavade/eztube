import React from "react";
import AppNavbar from "../AppNavbar";
import Tabs from "../Tabs";
import Account from "../Account";
import Settings from "../Settings";
import Studio from "../Studio";
import Playlist from "../Playlist";
import Liked from "../Liked";

export default function studio(props) {
  const [page, changePage] = React.useState({
    account: false,
    setting: false,
    studio: false,
    playlist: false,
    likedSong: false,
  });

  return (
    <div className="dashboard">
      <AppNavbar data={props.data} toPage={changePage}/>
      {page.account ? (
        <Account data={props.data} />
      ) : page.setting ? (
        <Settings data={props.data} />
      ) : page.studio ? (
        <Studio data={props.data} toPage={changePage}/>
      ) : page.playlist ? (
        <Playlist data={props.data} />
      ) : page.likedSong ? (
        <Liked data={props.data} />
      ) : null}
      <Tabs id="offcanvasScrolling" toPage={changePage}/>
    </div>
  );
}
