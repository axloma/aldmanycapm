import { useState, useEffect } from "react";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { RoomContext } from "../context/context";
import { nanoid } from "nanoid";
import jwtInterceptor from "../components/jwtintercept";
import Button from "@mui/material/Button";
import Hero from "../components/hero";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
export default function BasicTable() {
  // const { userlogedin, handleuserChange, user, Admin } =
  //   useContext(RoomContext);
  const { auth } = useAuth();
  const user = auth?.user;
  console.log(auth, "AUTH", "USER", user);
  const [booking, SetBooking] = useState();
  const [bookedinfo, SetBookedinfo] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getbooking = async () => {
      // const token = localStorage.getItem("token");

      // const cus = await jwtInterceptor
      //   .get(`${process.env.REACT_APP_Backend_URL}/booking/${user?.email}`, {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //     withCredentials: true,
      //   })

      const response = await axiosPrivate
        .get(`/booking/${user}`, {
          signal: controller.signal,
        })
        .then((res) => {
          console.log(res, "FROM MYBOOKING");
          isMounted && SetBooking(res.data);
        })
        .catch((err) => console.log(err));
    };
    getbooking();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  let newb;
  const getb = () => {
    newb = booking?.map((item, index) => {
      let bookinfo = Object.values(item[0].bookitem);
      bookinfo = bookinfo[0];
      const room = item[0].room;
      const newroom = { bookinfo, room };
      // console.log(newroom), "NEWROM";
      // console.log(bookinfo[0], "IX");
      return newroom;
    });
    SetBookedinfo(newb);
  };
  // console.log(booking, "FROM mBOOKI");
  // console.log(newb, "NEWB");
  return (
    <>
      <Hero title={"About Us"} />{" "}
      {/* <section className="breadcrumb_area">
        <div
          className="overlay bg-parallax"
          data-stellar-ratio="0.8"
          data-stellar-vertical-offset="0"
          data-background=""
        ></div>
        <div className="container"> */}
      <Button
        // disabled={loading}
        variant="outlined"
        // variant="contained"
        // endIcon={<ChevronRightRoundedIcon />}
        // loading={loading}
        loadingPosition="center"
        onClick={getb}
        sx={{
          width: { xs: "100%", sm: "fit-content" },
          // display: `${dispnex}`,
          backgroundColor: "white",
        }}
        // type="submit"
        // form={`form-step${activeStep}`}
      >
        show all booking
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>My Bookings</TableCell>
              {/* <TableCell align="right">Date & Timings</TableCell> */}
              <TableCell align="right">CheckIn</TableCell>
              <TableCell align="right">CheckOut</TableCell>
              <TableCell align="right">Adult</TableCell>
              <TableCell align="right">Childern</TableCell>
              <TableCell align="right">Number of room</TableCell>

              <TableCell align="right">room price</TableCell>
              <TableCell align="right">img</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookedinfo?.map((book) => (
              <TableRow
                key={nanoid()}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {book?.room?.name}
                </TableCell>
                <TableCell align="right">{book?.bookinfo?.from}</TableCell>
                <TableCell align="right">{book?.bookinfo?.to}</TableCell>
                <TableCell align="right">{book?.bookinfo?.adult}</TableCell>
                <TableCell align="right">{book?.bookinfo?.childern}</TableCell>
                <TableCell align="right">{book?.bookinfo?.room}</TableCell>
                <TableCell align="right">{book?.room?.price}</TableCell>

                <TableCell align="right">
                  {" "}
                  <img
                    src={`https://` + book?.room?.images[0]}
                    height="40vh"
                    width="40vw"
                  />{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* </div>
      </section> */}
    </>
  );
}
