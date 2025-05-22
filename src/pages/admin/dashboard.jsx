import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import avatar from "../../assets/ava.jpg";
import ava from "../../assets/user.png";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { borderRadius, textAlign } from "@mui/system";
import { useContext, useState } from "react";
import { RoomContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from "../../assets/logo.jpeg";
import Transication from "./allreservation";
import Home from "../home";
import Mail from "./mail";
import Users from "./users";
import Customer from "./Customers";
import Employee from "./employes";
import { nanoid } from "nanoid";

const pages = {
  transaction: <Transication />,
  mail: <Mail />,
  users: <Users />,
  Customers: <Customer />,
  addUser: <Employee />,
  HOME: <Home />,
  // "about us": "/about",
  // rooms: "/accomodation",
  // Gallery: "Gallery",
  // contact: "contact",
};

const settings = {
  Profile: "profile",
  Account: "account",
  Dashboard: "userdashboard",
};

const settingsauth = {
  Login: "login",
  Signup: "sigunup",
  SendMessage: "contact",
};

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // console.log(userlogedin)
  const { userlogedin, handleuserChange, logoutApiCall } =
    useContext(RoomContext);
  // console.log(typeof handleuserChange);
  const [thisUserLoged, SetThisUserLoged] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    // console.log(handleuserChange(), "HANDLER");
    SetThisUserLoged(handleuserChange());
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    SetThisUserLoged(handleuserChange());
  };
  {
  }
  const [value, SetValue] = useState(null);

  const stylebtn = {
    display: "block",
    my: 2,
    backgroundColor: "#d0d0ea" || "#030304",
    margin: ".4rem",
    color: " hsl(0deg 0% 100%)",
    padding: ".6rem",
    fontSize: "1.1rem",
    fontFamily: "monospace",
    textAlign: "center",
    alighnItem: "center",
    borderRadius: "1rem",
    "&:hover": {
      background: "#efefef",
      transform: "translateY(-1px)",
    },
  };
  function logout() {
    logoutApiCall();
  }
  useEffect(() => {
    // console.log("hi");
    SetThisUserLoged(localStorage.getItem("userProfile"));
    // SetThisUserLoged(handleuserChange);
  }, [thisUserLoged]);

  return (
    <div>
      <AppBar
        position="fixed"
        style={{ backgroundColor: "#070707ba", minHeight: "5vh" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <AdbIcon
            sx={{ display: { xs: "", md: "flex" }, mr: 1, src: `${logo}` }}
            src={logo}
          /> */}
            <img
              className="nav-logo"
              src={logo}
              alt="Porousway Logo"
              width="40"
              height="40"
              style={{ backgroundColor: "gray", borderRadius: "20%" }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                // letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {Object.keys(pages).map((item, i) => (
                  <span key={item} onClick={() => SetValue(pages[item])}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        {" "}
                        {item}
                      </Typography>
                    </MenuItem>
                  </span>
                ))}
              </Menu>
            </Box>
            {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {/* LOGO */}
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "",
                gap: "1rem",
              }}
            >
              {Object.keys(pages).map((item, i) => (
                <Button
                  key={item}
                  onClick={() => SetValue(pages[item])}
                  sx={stylebtn}
                >
                  <Link to={pages[item]}>{item}</Link>
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={thisUserLoged ? avatar : ava} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {thisUserLoged && (
                  <div>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        <Link to="/profile"> Profile</Link>
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        <Link to="/profile"> Account</Link>
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to="/contact">
                        <Typography sx={{ textAlign: "center" }}>
                          Send Message
                        </Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to="/" onClick={logoutApiCall}>
                        <Typography sx={{ textAlign: "center" }}>
                          {" "}
                          logout
                        </Typography>
                      </Link>
                    </MenuItem>
                  </div>
                )}
                {!thisUserLoged && (
                  <div>
                    <Link to="/login">
                      <MenuItem onClick={handleCloseUserMenu}>
                        Login
                        <Typography sx={{ textAlign: "center" }}></Typography>
                      </MenuItem>
                    </Link>
                    <Link to="/reg">
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography sx={{ textAlign: "center" }}>
                          Sign Up
                        </Typography>
                      </MenuItem>
                    </Link>
                    <Link to="/contact">
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography sx={{ textAlign: "center" }}>
                          Send Message
                        </Typography>
                      </MenuItem>
                    </Link>
                  </div>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div>{value && value}</div>
    </div>
  );
}
export default ResponsiveAppBar;
