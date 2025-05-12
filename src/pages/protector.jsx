import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const storeUser = (data) => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      username: data.user.username,
      jwt: data.jwt,
    })
  );
};

export const userData = () => {
  const token = localStorage.getItem("token");

  //   return JSON.parse(stringifiedUser || {});
  return token;
};

export const Protector = ({ Component }) => {
  const navigate = useNavigate();

  const token = userData();
  console.log(token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  return Component;
};
