import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Linkm from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./components/ForgotPassword";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import { InputAdornment } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";

import {
  GoogleIcon,
  FacebookIcon,
  SitemarkIcon,
} from "./components/CustomIcons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
// import Cookies from 'js-cookie';
// import { useContext, useState, useEffect } from "react";
// import { RoomContext } from "../../context/context";
// import { GoogleLogin } from "@react-oauth/google";
// import jwtInterceptor from "../../components/jwtintercept";
// import { jwtDecode } from "jwt-decode";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useRef, useState, useEffect } from "react";
// import AuthContext from "../../context/AuthProvider";
import useAuth from "../../hooks/useAuth";
// import { useEffect } from 'react';
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "650px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
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

export default function SignIn(props) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [userloged, setUserLoged] = useState(
    JSON.parse(localStorage.getItem("userProfile"))
  );
  const [errmsg, setErrMsg] = useState();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, SetProfile] = useState();
  // const { apilogin, userlogedin, loginApiCall } = useContext(RoomContext);
  const [showPassword, SetShowPassword] = useState(false);
  const { setAuth, auth, persist, setPersist } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  console.log(from, "FROM ");
  const [loading, SetLoading] = useState(false);
  const handleShowPassword = () => {
    SetShowPassword((prev) => !prev);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };
  const cstyle = {
    // position: "relative",
    // height:"100vh",
    // zIndex:"100"
    top: "-4rem",
    // marginBottom:"3rem"
  };
  const loginApiCall = async (payload, user, pwd) => {
    let userlogedin = false;
    try {
      SetLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_Backend_URL}/auth`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = res?.data?.accessToken;
      const roles = res?.data?.roles;
      console.log(roles, "BEFORE AUT");
      setAuth({ user: payload.user, roles, accessToken });
      console.log(auth);
      // localStorage.setItem(
      //   "userProfile",
      //   JSON.stringify({ user: payload.user, roles })
      // );
    } catch (err) {
      SetLoading(false);
      if (!err?.response) {
        toast.error(`"No Server Response" ${err.message}`);
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error(`"Missing Username or Password" ${err.message}`);
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        toast.error(
          `"Unauthorized  Username or Password not correct " ${err.message}`
        );
        setErrMsg("Unauthorized  Username or Password not correct");
      } else {
        toast.error(`"Login Failed" ${err.message}`);
        setErrMsg("Login Failed");
      }
      // errRef.current.focus();
    }
    // toast.error(
    //   `ERROR  Username or password are not correct ${err.message}`
    // )
    // .then(alert("welcome"));

    const apiResponse = await axios
      .get(`${process.env.REACT_APP_Backend_URL}/refresh`, {
        withCredentials: true,
      })
      .then((res) => {
        // this.user = res.data.user;

        userlogedin = true;
        const userProfile = { ...res?.data.user, roles: res?.data?.roles };
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        // console.log(roles, "BEFORE profile");

        // localStorage.setItem("userProfile", JSON.stringify(userProfile));
        // localStorage.setItem("token", res.data.accessToken);
      })
      .catch((err) => {
        toast.error(`ERROR  SOMETHING WENT WRONG  ${err.message}`);
      });

    return userlogedin;
  };
  const handleSubmit = async (event) => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    // const value = Cookies.get('jwt');

    let email = data.get("email");
    let password = data.get("password");
    let payload = { user: email, pwd: password };
    const log = await loginApiCall(payload);
    // setUserLoged(log);
    if (log === true) {
      navigate(from, { replace: true });
      // navigate("/");
    }
  };

  const login = useGoogleLogin({
    // onSuccess: (tokenResponse) => console.log(tokenResponse),
    // onSuccess: (tokenResponse) => console.log(tokenResponse),
    onSuccess: (codeResponse) => {
      // setUser(codeResponse);
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          let dat = res.data;
          // SetProfile(res.data);
          localStorage.setItem("userProfile", JSON.stringify(res.data));
          setAuth({
            user: res.data?.email,
            roles: [2001],
            accessToken: codeResponse.access_token,
          });
          // localStorage.setItem(
          //   "token",
          //   JSON.stringify(codeResponse.access_token)
          // );

          navigate("/");
        })
        .catch((err) => console.log(err));
    },
    onError: (error) => toast.error(`Login Failed:${error}`),
  });

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };
  useEffect(() => {
    const user = localStorage.getItem("userProfile");
    setUserLoged(user);

    if (user) {
      navigate("/profile");
    }
  }, [userloged]);
  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);
  const togglePersist = () => {
    setPersist((prev) => !prev);
  };
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
              <SignInContainer
                direction="column"
                justifyContent="space-between"
                style={cstyle}
              >
                <ColorModeSelect
                  sx={{ position: "fixed", top: "5rem", right: "1rem" }}
                />
                <Card variant="outlined">
                  {/* <SitemarkIcon /> */}
                  {errmsg && (
                    <p style={{ backgroundColor: "red", color: "blue" }}>
                      {errmsg}
                    </p>
                  )}
                  <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                      width: "100%",
                      fontSize: "clamp(2rem, 10vw, 2.15rem)",
                    }}
                  >
                    Sign in
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      gap: 1,
                    }}
                  >
                    <FormControl>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <TextField
                        error={emailError}
                        helperText={emailErrorMessage}
                        id="email"
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        autoComplete="email"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={emailError ? "error" : "primary"}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <TextField
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        name="password"
                        placeholder="••••••"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={passwordError ? "error" : "primary"}
                      />
                      <IconButton onClick={handleShowPassword}>
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                      {/* <InputAdornment position="end"> */}
                      {/* </InputAdornment> */}
                    </FormControl>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="remember"
                          color="primary"
                          id="persist"
                          onChange={togglePersist}
                          checked={persist}
                        />
                      }
                      label="Remember me"
                    />
                    <ForgotPassword open={open} handleClose={handleClose} />
                    <Button
                      type="submit"
                      disabled={loading}
                      fullWidth
                      // variant="contained"
                      variant="outlined"
                      onClick={validateInputs}
                      loading={loading}
                      loadingPosition="center"
                    >
                      Sign in
                    </Button>
                    <Linkm
                      component="button"
                      type="button"
                      onClick={handleClickOpen}
                      variant="body2"
                      sx={{ alignSelf: "center" }}
                    >
                      Forgot your password?
                    </Linkm>
                  </Box>
                  <Divider>or</Divider>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={login}
                      startIcon={<GoogleIcon />}
                      disabled={true}
                    >
                      Sign in with Google
                      {/* <GoogleLogin
                        onSuccess={async (credentialResponse) => {
                          console.log(credentialResponse);
                          const result = await credentialResponse?.profileObj;
                          console.log(result);
                          const creadentialDecoded = await jwtDecode(
                            credentialResponse.credential
                          );
                          // console.log(credentialResponse);
                          console.log(creadentialDecoded);
                        }}
                        onError={() => {
                          console.log("Login Failed");
                        }}
                      /> */}
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => alert("Sign in with Facebook")}
                      startIcon={<FacebookIcon />}
                      disabled={true}
                    >
                      Sign in with Facebook
                    </Button>
                    <Typography sx={{ textAlign: "center" }}>
                      Don&apos;t have an account?{" "}
                      <Link to="/reg" className="nav-link">
                        {" "}
                        Sign up
                      </Link>
                      {/* <Linkm
                href="/reg"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign up
              </Linkm> */}
                    </Typography>
                  </Box>
                </Card>
              </SignInContainer>
            </AppTheme>
          </div>
        </section>
      )}
    </>
  );
}
