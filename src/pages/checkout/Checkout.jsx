// import * as React from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import AddressForm from "./components/AddressForm";
import Info from "./components/Info";
import InfoMobile from "./components/InfoMobile";
import PaymentForm from "./components/PaymentForm";
import Review from "./components/Review";
import SitemarkIcon from "./components/SitemarkIcon";
import AppTheme from "../shared-theme/AppTheme";
import React from "react";
import ColorModeIconDropdown from "../shared-theme/ColorModeIconDropdown";
import { RoomContext } from "../../context/context";
import { useContext, useEffect, useState, useRef } from "react";
import { nanoid } from "nanoid";
import { format, isFuture, isPast } from "date-fns";
import axios from "axios";
import validator from "validator";

import "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51RHKpLCTcEpFKYaOPfD95CLeRGsk8X5ohRgNkosKg75O8vKTOmQTXjDtzFEqKGUV5MLxtugGfAr33bjH7sdZLTN400MBiYh4ik"
);

const steps = [
  "Personal Information",
  "Payment details",
  "Reservation details",
];
let bookingpayload;
let userid;
let bookedroom;
let useremail;
function subm() {}

var clientSecrete;
var ref;

var [paymentstatus, setPaymentstatuse] = [];
var [paymentinfo, setpaymentinfo] = "";
var dispnex = "";
function getStepContent(step) {
  ref = useRef();
  const [confid, seconfId] = useState(null);
  switch (step) {
    case 0:
      dispnex = "";
      return (
        <form id="form-step1" onSubmit={subm}>
          {" "}
          <AddressForm />
        </form>
      );
    case 1:
      // const stripe = useStripe();
      // const elements = useElements();
      dispnex = "none";
      return (
        <div>
          <Elements
            stripe={stripePromise}
            options={{ clientSecret: clientSecrete }}
          >
            {/* <PaymentElement /> */}

            <PaymentForm
              ref={ref}
              setPaymentstatuse={setPaymentstatuse}
              setpaymentinfo={setpaymentinfo}
              userid={userid}
              bookedroom={bookedroom}
              useremail={useremail}
              seconfId={seconfId}
            />
          </Elements>
        </div>
      );
    case 2:
      const subj = "YOUR PAYMENT HAS Verified";
      const msg = `<div style="background-color:black ; text-decoration:none ;text-align:center ;position:relative;height:14vh"><h1><a  href="https://www.aldamanycamp.info" style="text-decoration: none ;cursor:pointer">aldamanycamp.info</a></h1><h2><hr/>YOUR CONFIRMATION ID: ${confid}</h2></div>`;
      const automail = async () => {
        const result = await axios
          .post(
            `${process.env.REACT_APP_Backend_URL}/automail`,
            {
              useremail,
              subj,
              msg,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((e) => {
            console.log(e);
          });
      };
      automail();
      return (
        <Review
          bookitemr={bookingpayload}
          confid={confid}
          useremail={useremail}
        />
      );
    default:
      throw new Error("Unknown step");
  }
  return <></>;
}
export default function Checkout(props) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  const [phonelError, setPhoneError] = React.useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = React.useState("");
  const [cardNumberError, setCardNumberError] = useState(false);
  const [expError, setexpError] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = useState(null);
  const { addToCart, removeFromCart, bookitem, rooms } =
    useContext(RoomContext);

  [paymentstatus, setPaymentstatuse] = useState(false);
  [paymentinfo, setpaymentinfo] = useState([]);
  let price = 0;
  let Price = rooms.map((room) => {
    if (bookitem[room.id] != 0) {
      price =
        parseInt(price) + parseInt(`${room.price * bookitem[room.id].room}`);

      return price;
    }
  });

  const room = rooms.map((room) => {
    if (bookitem[room.id] != 0) {
      let info = { bookitem, room };
      return info;
    }
  });
  bookedroom = room;

  const validateInputs = (e) => {
    // e.preventDefault()

    const email = document.getElementById("email");
    const name = document.getElementById("first-name");
    const phone = document.getElementById("phone");
    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      setMessage(emailErrorMessage);
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!phone.value || phone.value.length < 8) {
      setPhoneError(true);
      setPhoneErrorMessage("phone must be at least 8 characters long.");
      setMessage(phoneErrorMessage);
      isValid = false;
    } else {
      setPhoneError(false);
      setPhoneErrorMessage("");
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      setMessage(nameErrorMessage);
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    return isValid;
  };

  const [userId, setUserId] = useState();
  const subm = async (e) => {
    if (activeStep == 0) {
      let valid = validateInputs();
      if (!valid) {
        if (nameError) {
          e.preventDefault();
          console.log("ERROR");
          alert(nameErrorMessage);
          return;
        } else if (emailError) {
          alert(emailErrorMessage);
          return;
        } else if (phonelError) {
          alert(phoneErrorMessage);
          return;
        }
        return;
      }
      const data = new FormData(document.getElementById("form-step1"));

      const f = data.get("first-name");
      const l = data.get("last-name");
      const email = data.get("email");
      const phone = data.get("phone");
      const username = `${f} ${l}`;

      const payload = {
        user: username,
        email: email,
        phone: phone,
        amount: Number(price),
      };

      setLoading(true);
      const user = await axios
        .post(
          `${process.env.REACT_APP_Backend_URL}/register/customer`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setLoading(false);
          console.log(res.data.id, "from payload");
          setUserId(res.data.id);
          userid = res.data.id;
          clientSecrete = res.data.clientSecret;
          console.log(clientSecrete, "from payload");
          setMessage(null);
          setActiveStep(activeStep + 1);
          useremail = email;
        })
        .catch((e) => {
          setLoading(false);
          setMessage(e.response.data.message);
          window.scrollTo(0, 0);
        });
    }
    if (activeStep == 1) {
      setDisplayNext("none");

      setActiveStep(activeStep + 1);
    }
  };
  useEffect(() => {
    if (paymentstatus) {
      setActiveStep(activeStep + 1);
    }
  }, [paymentstatus]);

  const [activeStep, setActiveStep] = React.useState(0);

  const [ismodified, setIsmodified] = useState(false);
  const [isempty, setIsEmpty] = useState(false);

  const handleNext = (event) => {};
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <section className="about_history_area section_gap ">
      <div
        className="overlay bg-parallax"
        data-stellar-ratio="0.8"
        data-stellar-vertical-offset="0"
        data-background=""
      ></div>
      <div className="section_gap checkout">
        <AppTheme {...props}>
          <CssBaseline enableColorScheme />
          <Box sx={{ position: "fixed", top: "5rem", right: "1rem" }}>
            <ColorModeIconDropdown />
          </Box>

          <Grid
            container
            sx={{
              height: {
                xs: "100%",
                sm: "calc(100dvh - var(--template-frame-height, 0px))",
              },
              mt: {
                xs: 4,
                sm: 0,
              },
            }}
          >
            <Grid
              size={{ xs: 12, sm: 5, lg: 4 }}
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                backgroundColor: "background.paper",
                borderRight: { sm: "none", md: "1px solid" },
                borderColor: { sm: "none", md: "divider" },
                alignItems: "start",
                pt: 16,
                px: 10,
                gap: 4,
              }}
            >
              <SitemarkIcon />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  width: "100%",
                  maxWidth: 500,
                }}
              >
                <Info totalPrice={activeStep >= 2 ? "$144.97" : "$134.98"} />
              </Box>
            </Grid>
            <Grid
              size={{ sm: 12, md: 7, lg: 8 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "100%",
                width: "100%",
                backgroundColor: {
                  xs: "transparent",
                  sm: "background.default",
                },
                alignItems: "start",
                pt: { xs: 0, sm: 16 },
                px: { xs: 2, sm: 10 },
                gap: { xs: 4, md: 8 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { sm: "space-between", md: "flex-end" },
                  alignItems: "center",
                  width: "100%",
                  maxWidth: { sm: "100%", md: 600 },
                }}
              >
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    flexGrow: 1,
                  }}
                >
                  {message && (
                    <p
                      style={{
                        backgroundColor: "red",
                        position: "relative",
                        textAlign: "center",
                        alignSelf: "center",
                      }}
                    >
                      {message}
                    </p>
                  )}
                  <Stepper
                    id="desktop-stepper"
                    activeStep={activeStep}
                    sx={{ width: "100%", height: 40 }}
                  >
                    {steps.map((label) => (
                      <Step
                        sx={{
                          ":first-of-type": { pl: 0 },
                          ":last-child": { pr: 0 },
                        }}
                        key={label}
                      >
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </Box>
              <Card sx={{ display: { xs: "flex", md: "none" }, width: "100%" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    {/* // pass handleNext to getStepContent here
                  <Typography>{getStepContent(index, {checkoutForm, handleChange, handleNext})}</Typography> */}
                    <Typography variant="subtitle2" gutterBottom>
                      Selected products
                    </Typography>
                    <Typography variant="body1">
                      {activeStep >= 2 ? "$144.97" : "$134.98"}
                    </Typography>
                  </div>
                  <InfoMobile
                    totalPrice={activeStep >= 2 ? "$144.97" : "$134.98"}
                  />
                </CardContent>
              </Card>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  width: "100%",
                  maxWidth: { sm: "100%", md: 600 },
                  maxHeight: "720px",
                  gap: { xs: 5, md: "none" },
                }}
              >
                <Stepper
                  id="mobile-stepper"
                  activeStep={activeStep}
                  alternativeLabel
                  sx={{ display: { sm: "flex", md: "none" } }}
                >
                  {steps.map((label) => (
                    <Step
                      sx={{
                        ":first-of-type": { pl: 0 },
                        ":last-child": { pr: 0 },
                        "& .MuiStepConnector-root": { top: { xs: 6, sm: 12 } },
                      }}
                      key={label}
                    >
                      <StepLabel
                        sx={{
                          ".MuiStepLabel-labelContainer": { maxWidth: "70px" },
                        }}
                      >
                        {label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
                {activeStep === steps.length ? (
                  <Stack spacing={2} useFlexGap>
                    <Typography variant="h1">📦</Typography>
                    <Typography variant="h5">
                      Thank you for your order!
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "text.secondary" }}
                    >
                      Your order number is
                      <strong>&nbsp;#140396</strong>. We have emailed your order
                      confirmation and will update you once its shipped.
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        alignSelf: "start",
                        width: { xs: "100%", sm: "auto" },
                      }}
                    >
                      Go to my orders
                    </Button>
                  </Stack>
                ) : (
                  <React.Fragment>
                    {getStepContent(activeStep)}

                    <Box
                      sx={[
                        {
                          display: "flex",
                          flexDirection: { xs: "column-reverse", sm: "row" },
                          alignItems: "end",
                          flexGrow: 1,
                          gap: 1,
                          pb: { xs: 12, sm: 0 },
                          mt: { xs: 2, sm: 0 },
                          mb: "60px",
                        },
                        activeStep !== 0
                          ? { justifyContent: "space-between" }
                          : { justifyContent: "flex-end" },
                      ]}
                    >
                      {activeStep !== 0 && (
                        <Button
                          startIcon={<ChevronLeftRoundedIcon />}
                          onClick={handleBack}
                          variant="text"
                          sx={{ display: { xs: "none", sm: "flex" } }}
                        >
                          Previous
                        </Button>
                      )}
                      {activeStep !== 0 && (
                        <Button
                          startIcon={<ChevronLeftRoundedIcon />}
                          onClick={handleBack}
                          variant="outlined"
                          fullWidth
                          sx={{ display: { xs: "flex", sm: "none" } }}
                        >
                          Previous
                        </Button>
                      )}

                      <Button
                        disabled={loading}
                        variant="outlined"
                        // variant="contained"
                        endIcon={<ChevronRightRoundedIcon />}
                        loading={loading}
                        loadingPosition="center"
                        onClick={subm}
                        sx={{
                          width: { xs: "100%", sm: "fit-content" },
                          display: `${dispnex}`,
                        }}
                        type="submit"
                        // form={`form-step${activeStep}`}
                      >
                        {activeStep === steps.length - 1
                          ? "Place order"
                          : "Next"}
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
              </Box>
            </Grid>
          </Grid>
        </AppTheme>
      </div>
    </section>
  );
}
