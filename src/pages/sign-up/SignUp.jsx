import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
// import Link from '@mui/material/Link';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import {
  GoogleIcon,
  FacebookIcon,
  SitemarkIcon,
} from "./components/CustomIcons";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { RoomContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "750px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  // height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignUp(props) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  const [phonelError, setPhoneError] = React.useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = React.useState("");
  const { apilogin, userlogedin, handleuserChange } = useContext(RoomContext);
  const [userloged, setUserLoged] = useState(null);

  console.log(userlogedin, "FROM REGISTER");

  const navigate = useNavigate();

  const validateInputs = (e) => {
    // e.preventDefault()

    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!phone.value || phone.value.length < 8) {
      setPhoneError(true);
      setPhoneErrorMessage("phone must be at least 8 characters long.");
      isValid = false;
    } else {
      setPhoneError(false);
      setPhoneErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    console.log(event);
    if (nameError || emailError || passwordError) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    // const lastName= data.get('lastName')
    // console.log(lastName)
    const email = data.get("email");
    const phone = data.get("phone");
    const password = data.get("password");
    const Cpassword = data.get("passwordC");

    const payload = {
      user: name,
      email: email,
      pwd: password,
      Cpassword,
      phone: phone,
    };
    console.log(payload);
    try {
      const user = await axios.post(
        `${process.env.REACT_APP_Backend_URL}/register`,
        payload
      );
      console.log(user, "USER");
      alert("WELCOME ");
      if (user.status === 201) {
        const log = await apilogin({ user: email, pwd: password });
        console.log(log);
        if (log) {
          navigate("/");
        }
      }
    } catch (e) {
      console.log(e);

      if (e.status === 409) {
        alert("Email already exists ");
      }
      if (e.status === 400) {
        alert(e.response.data.message);
      }
    }

    // console.log(user.statuscode)
    // console.log(user)

    // console.log({
    //   name: data.get('name'),
    //   lastName: data.get('lastName'),
    //   email: data.get('email'),
    //   password: data.get('password'),

    // });
  };
  useEffect(() => {
    const user = localStorage.getItem("userProfile");
    setUserLoged(user);
    console.log(user);
    if (user) {
      navigate("/profile");
    }
  }, [userloged]);

  return (
    <>
      {!userloged && (
        <section className="breadcrumb_area">
          <div
            className="overlay bg-parallax"
            data-stellar-ratio="0.8"
            data-stellar-vertical-offset="0"
            data-background=""
          ></div>
          <div className="container">
            <AppTheme {...props}>
              <CssBaseline enableColorScheme />
              <ColorModeSelect
                sx={{ position: "fixed", top: "5rem", right: "1rem" }}
              />
              <SignUpContainer
                direction="column"
                justifyContent="space-between"
              >
                <Card variant="outlined">
                  <SitemarkIcon />
                  <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                      width: "100%",
                      fontSize: "clamp(2rem, 10vw, 2.15rem)",
                    }}
                  >
                    Sign up
                  </Typography>

                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <FormControl>
                      <FormLabel htmlFor="name">User name</FormLabel>
                      <TextField
                        autoComplete="name"
                        name="name"
                        required
                        fullWidth
                        id="name"
                        placeholder="Jon Snow"
                        error={nameError}
                        helperText={nameErrorMessage}
                        color={nameError ? "error" : "primary"}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        placeholder="your@email.com"
                        name="email"
                        autoComplete="email"
                        variant="outlined"
                        error={emailError}
                        helperText={emailErrorMessage}
                        color={passwordError ? "error" : "primary"}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="phone">Phone Number</FormLabel>
                      <TextField
                        required
                        fullWidth
                        id="phone"
                        placeholder="your phone "
                        name="phone"
                        autoComplete="phone"
                        variant="outlined"
                        error={phonelError}
                        helperText={phoneErrorMessage}
                        color={passwordError ? "error" : "primary"}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        placeholder="••••••"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        variant="outlined"
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        color={passwordError ? "error" : "primary"}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="passwordC">
                        Confirm Password
                      </FormLabel>
                      <TextField
                        required
                        fullWidth
                        name="passwordC"
                        placeholder="••••••"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        variant="outlined"
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        color={passwordError ? "error" : "primary"}
                      />
                    </FormControl>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I want to receive updates via email."
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      onClick={validateInputs}
                    >
                      Sign up
                    </Button>
                  </Box>
                  <Divider>
                    <Typography sx={{ color: "text.secondary" }}>or</Typography>
                  </Divider>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {/* <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => alert("Sign up with Google")}
                      startIcon={<GoogleIcon />}
                    >
                      Sign up with Google
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => alert("Sign up with Facebook")}
                      startIcon={<FacebookIcon />}
                    >
                      Sign up with Facebook
                    </Button> */}
                    <Typography sx={{ textAlign: "center" }}>
                      Already have an account?{" "}
                      <Link to="/login" className="nav-link">
                        {" "}
                        Sign in
                      </Link>
                      {/* <Link
                href="/material-ui/getting-started/templates/sign-in/"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign in
              </Link> */}
                    </Typography>
                  </Box>
                </Card>
              </SignUpContainer>
            </AppTheme>
          </div>
        </section>
      )}
    </>
  );
}
