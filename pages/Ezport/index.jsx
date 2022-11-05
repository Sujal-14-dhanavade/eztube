import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";


export default function Ezport() {
    const router = useRouter();

    useEffect(() => {
        axios.request({
            method: "GET",
            url: "/api/isAuth"
        }).then(res => {
            if(!res.data.isAuth) {
                router.push("/");
            }
        })
    })

  return (
    <>
        <h1>HELLO this is main App</h1>
    </>
  );
}