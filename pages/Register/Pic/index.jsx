import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import { useRouter } from "next/router";

export default function Pic(props) {
  const [image, onChangeImg] = React.useState(null);
  const router = useRouter();
  function onFormChange(e) {
    var file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onChangeImg(reader.result);
    };
  }

  function onSkip() {
    router.push("/Dashboard");
  }
  return (
    <div>
      <div className="d-flex justify-content-center mb-5">
        {image !== null ? (
          <Avatar src={image} alt="user pic" sx={{ width: 100, height: 100 }} />
        ) : (
          <Avatar alt="user pic" sx={{ width: 100, height: 100 }}>
            <PersonIcon sx={{ fontSize: "50px" }} />
          </Avatar>
        )}
      </div>

      <form
        action="/api/userPicUpload"
        method="POST"
        encType="multipart/form-data"
        className="d-flex mx-1 mx-md-4 flex-column align-items-center"
      >
        <div className="d-flex flex-column justify-content-center">
          <input
            type="file"
            name="userPicFile"
            className="text-light"
            accept="image/png, image/jpeg"
            onChange={onFormChange}
          />
        </div>

        <div className="d-flex flex-row mt-5">
          <button
            className="btn btn-danger me-5"
            name="submit"
            type={"submit"}
            value={props.data}
          >
            Submit
          </button>
          <button className="btn btn-danger" value="skip" onClick={onSkip}>
            Skip &#9758;
          </button>
        </div>
      </form>
    </div>
  );
}
