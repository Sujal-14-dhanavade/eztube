import React from "react";
import axios from "axios";
import { Button } from "@mui/material";

export default function FollowButton(props) {
  const [isSet, changeSet] = React.useState(props.set);
  const toggleFollow = () => {
    if (isSet) {
      axios
        .request({
          method: "POST",
          url: "/api/follow/remove",
          data: { userId: props.userId },
        })
        .then(() => {
          {
            props.setDependent ? props.setDependent(!props.dependent) : null;
          }
          changeSet(!isSet);
        });
    } else {
      axios
        .request({
          method: "POST",
          url: "/api/follow/add",
          data: { userId: props.userId },
        })
        .then(() => {
          changeSet(!isSet);
        });
    }
  };
  return (
    <Button size="small" color="primary" onClick={toggleFollow}>
      {isSet ? (
        "Followed"
      ) : "Follow"}
    </Button>
  );
}
