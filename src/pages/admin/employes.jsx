import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
// import Link from '@mui/material/Link';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
// import { SitemarkIcon } from "./components/CustomIcons";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

import axios from "axios";
import MuiCard from "@mui/material/Card";
import FormGroup from "@mui/material/FormGroup";
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

const employes = (props) => {
  const [checked, setChecked] = React.useState(false);
  const [roles, SetRoles] = React.useState([]);
  const handleChange = (event) => {
    setChecked(event.target.checked);
    // SetRoles(event.target.value);
    // if ([checked]) {
    //   console.log("CHECKED");
    //   console.log(event.target.checked);
    //   console.log(event.target.value);
    //   console.log(roles);
    // }
  };
  const handleSubmit = async (event) => {
    console.log(event);
    // if (nameError || emailError || passwordError) {
    //   event.preventDefault();
    //   return;
    // }

    event.preventDefault();
    const data = new FormData(document.getElementById("form"));
    const name = data.get("name");
    // const lastName= data.get('lastName')
    // console.log(lastName)
    const email = data.get("email");
    const phone = data.get("phone");
    const password = data.get("password");
    const Cpassword = data.get("passwordC");
    const roles = data.getAll("roles");
    const payload = {
      user: name,
      email: email,
      pwd: password,
      Cpassword,
      phone: phone,
      roles: roles,
    };

    console.log(roles);
    console.log(payload);
    try {
      const user = await axios.post(
        `${process.env.REACT_APP_Backend_URL}/register/admin`,
        payload
      );
      console.log(user, "USER");
      alert("WELCOME ");
      if (user.status === 201) {
        alert("sucess");
        // const log = await apilogin({ user: email, pwd: password });
        // console.log(log);
        // if (log) {
        //   navigate("/");
        // }
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
        {/* <form onSubmit={(e) => handleSubmit(e)} id="form"> */}
        <AppTheme {...props}>
          <CssBaseline enableColorScheme />
          <ColorModeSelect
            sx={{ position: "fixed", top: "5rem", right: "1rem" }}
          />
          <SignUpContainer direction="column" justifyContent="space-between">
            <Card variant="outlined">
              {/* <SitemarkIcon /> */}
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
                id="form"
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
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="passwordC">Confirm Password</FormLabel>
                  <TextField
                    required
                    fullWidth
                    name="passwordC"
                    placeholder="••••••"
                    type="password"
                    id="passwordC"
                    autoComplete="new-password"
                    variant="outlined"
                  />
                </FormControl>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive updates via email."
                />
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        // defaultChecked
                        name="roles"
                        checked={checked[0]}
                        onChange={handleChange}
                        value="Admin"
                      />
                    }
                    label="Admin"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="roles"
                        checked={checked[1]}
                        onChange={handleChange}
                        value="Editor"
                      />
                    }
                    label="Editor"
                  />
                  <FormControlLabel
                    disabled
                    name="roles"
                    control={<Checkbox />}
                    label="User"
                  />
                </FormGroup>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  // onClick={(e) => handleSubmit(e)}
                >
                  Sign up
                </Button>
              </Box>
            </Card>
          </SignUpContainer>
        </AppTheme>
        {/* </form> */}
      </div>
    </section>
  );
};

export default employes;
