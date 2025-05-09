import React, { useState } from "react";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import axios from "axios";
import logo from "../../assets/logo.jpeg";
const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));
const styleform = {
  border: "2px solid black",
  boxShadow: "10px 10px 8px 10px #888888",
};
const mail = () => {
  const [loading, setLoading] = useState(false);
  const subm = async (formData) => {
    // const data = new FormData(document.getElementById("mail"));
    const email = formData.get("email");
    const from = formData.get("from");
    const subj = formData.get("subj");
    let msg = formData.get("msg");

    console.log(email, from, subj, msg);
    const token = localStorage.getItem("token");
    setLoading(true);

    const status = await axios
      .post(
        "http://127.0.0.1:3500/mail",
        {
          email,
          from,
          subj,
          msg,
        },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
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
        <form action={subm} id="mail" style={styleform}>
          {" "}
          <Grid container spacing={3}>
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel
                htmlFor="first-name"
                required
                style={{ color: "blue", backgroundColor: "black" }}
              >
                From
              </FormLabel>
              <OutlinedInput
                style={{ backgroundColor: "white" }}
                id="first-name"
                name="from"
                type="name"
                placeholder="ahmed@aldamanycamp.info/com/"
                autoComplete="first name"
                required
                size="small"
              />
            </FormGrid>
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel
                htmlFor="first-name"
                required
                style={{ color: "blue", backgroundColor: "black" }}
              >
                subject
              </FormLabel>
              <OutlinedInput
                style={{ backgroundColor: "white" }}
                id="first-name"
                name="subj"
                type="name"
                placeholder="aldamanycamp"
                autoComplete="first name"
                required
                size="small"
              />
            </FormGrid>
            <FormGrid size={{ xs: 12, md: 12 }}>
              <FormLabel
                htmlFor="first-name"
                required
                style={{ color: "blue", backgroundColor: "black" }}
              >
                email
              </FormLabel>
              <OutlinedInput
                style={{ backgroundColor: "white" }}
                id="first-name"
                name="email"
                fullWidth
                type="name"
                placeholder="name@gmail.com"
                autoComplete="first name"
                required
                size="small"
              />
            </FormGrid>
            <TextareaAutosize
              aria-label="minimum height"
              name="msg"
              minRows={3}
              placeholder="MSG"
              style={{ width: "100vw" }}
            />
            <Button
              variant="contained"
              // endIcon={<ChevronRightRoundedIcon />}
              loading={loading}
              loadingPosition="center"
              // onClick={subm}
              sx={{
                width: { xs: "100%", sm: "fit-content" },
                //   display: `${dispnex}`,
              }}
              type="submit"
              // form={`form-step${activeStep}`}
            >
              SEND
            </Button>
          </Grid>
        </form>
      </div>
    </section>
  );
};

export default mail;
