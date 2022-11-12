import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Dashboard from "../../components/Dashboard";

export default function Ezport() {
  const router = useRouter();
  const [userData, changeData] = React.useState(null);

  useEffect(() => {
    axios
      .request({
        method: "GET",
        url: "/api/isAuth",
      })
      .then((res) => {
        if (!res.data.isAuth) {
          router.push("/");
        } else {
          axios
            .request({
              method: "POST",
              url: "/api/getData",
            })
            .then((res) => {
              changeData(res.data);
            });
        }
      });
  });

  return (
    <div className="Ezport wavebg">
      {userData === null ? null : <Dashboard data={userData} />}
    </div>
  );
}
