import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Dashboard from "./Dashboard";



export default function Ezport() {
    const router = useRouter();
    const [userData, changeData] = React.useState(null);

    useEffect(() => {
        axios.request({
            method: "GET",
            url: "/api/isAuth"
        }).then(res => {
            if(!res.data.isAuth) {
                router.push("/");
            } else {
                axios.request({
                    method: "POST",
                    url: "/api/getData"
                }).then(res => {
                    console.log(res.data);
                    changeData(res.data);
                })
            }
        })
    })

  return (
    <div className="Ezport constellation">
        {(userData === null)? null: <Dashboard data = {userData}/> }
    </div>
  );
}