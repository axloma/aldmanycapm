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
import avatar from "../assets/ava.jpg";
import ava from "../assets/user.png";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { borderRadius, textAlign } from "@mui/system";
import { useContext, useState } from "react";
import { RoomContext } from "../context/context";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import logo from "../assets/logo.jpeg";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { Translate } from "react-bootstrap-icons";
import { ToastContainer, toast } from "react-toastify";
import useLogout from "../hooks/useLogout";
const pages = {
  HOME: "/",
  "about us": "/about",
  rooms: "/accomodation",
  Gallery: "/Gallery",
  contact: "/contact",
};
const settings = {
  Profile: "/mybooking",

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
  const { userlogedin, handleuserChange, logoutApiCall, Admin } =
    useContext(RoomContext);
  // console.log(typeof handleuserChange);
  const [thisUserLoged, SetThisUserLoged] = useState(null);
  const navigate = useNavigate();
  const [user, SetUser] = useState(
    JSON.parse(localStorage.getItem("userProfile"))
  );
  const location = useLocation();

  // const dispatch = useDispatch();
  useEffect(() => {
    // const token = user?.token;

    // SetThisUserLoged(JSON.parse(localStorage.getItem("userProfile")));
    SetUser(JSON.parse(localStorage.getItem("userProfile")));

    // SetThisUserLoged(handleuserChange);
  }, [location]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    SetThisUserLoged(handleuserChange());
    // SetThisUserLoged(user);
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
  const stylebtn = {
    display: "block",
    my: 4,
    backgroundColor: "#d0d0ea" || "#030304",
    margin: ".4rem",
    // color: " hsl(0deg 0% 100%)",
    padding: ".6rem",
    fontSize: "1rem",
    fontFamily: `'Lilita One', 'Coral Pixels' , cursive`,
    fontOpticalSizing: "auto",
    fontWeight: "600",
    fontStyle: "normal",
    textAlign: "center",
    alighnItem: "center",
    borderRadius: "1rem",
    "&:hover , &.active": {
      background: "#473636 ",
      transform: "translateY(-2px)",
    },
  };
  const Logout = useLogout();
  async function logout() {
    if (user?.verified_email) {
      googleLogout();
      localStorage.removeItem("userProfile");
      localStorage.removeItem("token");
      SetUser(null);
      navigate("/");
    } else {
      // logoutApiCall();
      await Logout();
      SetUser(null);
      navigate("/");
    }
  }

  return (
    <AppBar
      position="fixed"
      style={{ backgroundColor: "transparent", minHeight: "4vh" }}
    >
      <Container maxWidth="xl">
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          // transition={Bounce}
        />
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
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu} >
                  <Typography sx={{ textAlign: 'center' }} >{page}</Typography>
                </MenuItem>
              ))} */}
              {Object.keys(pages).map((item, i) => (
                <Link key={item} to={pages[item]}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      {" "}
                      {item}
                    </Typography>
                  </MenuItem>
                </Link>
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
            {
              // pages.map(([key,value]) => (

              Object.keys(pages).map((item, i) => (
                <Link to={pages[item]} key={item}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={stylebtn}
                    className={`nav-link ${location.pathname === pages[item] ? "active" : ""}`}
                    // className="nav-link"
                  >
                    {item}
                  </Button>
                </Link>
              ))

              // })
              // ))
            }
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {/* <Tooltip title="Open settings"> */}
            <Tooltip title={user ? user?.profile?.email || user?.email : user}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt="Remy Sharp" src={thisUserLoged ? avatar : ava} /> */}
                <Avatar
                  alt="Remy Sharp"
                  src={user ? user?.picture || avatar : user}
                />
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
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                   <Link to={setting}> {setting}</Link>

                  </Typography>
                </MenuItem>
              ))} */}
              {user && (
                <div>
                  <Link to="/mybooking">
                    {" "}
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        {" "}
                        mybooking{" "}
                      </Typography>
                    </MenuItem>
                  </Link>

                  <Link to="/profile">
                    {" "}
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        Account{" "}
                      </Typography>
                    </MenuItem>
                  </Link>

                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link to="/contact">
                      <Typography sx={{ textAlign: "center" }}>
                        Send Message
                      </Typography>
                    </Link>
                  </MenuItem>
                  <Link to="/" onClick={logout}>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        {" "}
                        logout
                      </Typography>
                    </MenuItem>
                  </Link>
                </div>
              )}
              {!user && (
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
                  <Link to="/mybooking2">
                    {" "}
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        {" "}
                        mybooking{" "}
                      </Typography>
                    </MenuItem>
                  </Link>
                </div>
              )}

              {/* {
        Object.keys(settingsauth).map((item, i)=>{
          <MenuItem key={item} onClick={handleCloseUserMenu}>
              <Typography sx={{ textAlign: 'center' }}>
                <Link to={i}> {item}</Link>

                </Typography>
          </MenuItem>
        
        })}  */}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
