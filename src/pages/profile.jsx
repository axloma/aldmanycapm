import { Button } from "bootstrap";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const profile = () => {
  const user = async () => {
    await axios
      .get("http://127.0.0.1:3500/refresh", {
        withCredentials: true,
      })
      .then((res) => {
        alert("WELCOME ");
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        if (e.response.status == 409 || 401 || 403) {
          alert("Wrong creadential ");
        }
      });
  };

  const logout = async () => {
    await axios
      .get("http://127.0.0.1:3500/logout", {
        withCredentials: true,
      })
      .then(() => {
        alert("WELCOME ");
        localStorage.removeItem("userProfile");
      })
      .catch((e) => {
        console.log(e);
        if (e.response.status == 409 || 401 || 403) {
          alert("Wrong creadential ");
        }
      });
  };

  const info = async () => {
    const users = await axios.get("http://127.0.0.1:3500/users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    });
    console.log(users);
  };
  return (
    <section className="breadcrumb_area">
      <div
        className="overlay bg-parallax"
        data-stellar-ratio="0.8"
        data-stellar-vertical-offset="0"
        data-background=""
      ></div>
      <div className="container">
        {/* <button onClick={user}>profile</button>
        <button onClick={logout}>logout</button>
        <button onClick={info}>info</button> */}
        <Link to="/dashboard">grid</Link>
      </div>
    </section>
  );
};

export default profile;
