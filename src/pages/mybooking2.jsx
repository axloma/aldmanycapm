import { useState, useEffect } from "react";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { nanoid } from "nanoid";
import Button from "@mui/material/Button";
import Hero from "../components/hero";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import axios from "../api/axios";
import axios from "axios";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

export default function BasicTable() {
  const [booking, SetBooking] = useState();
  const [bookedinfo, SetBookedinfo] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [confid, SetConfId] = useState("");
  const [message, SetMsg] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  searchParams.get("confid");
  console.log(searchParams.get("confid"));
  useEffect(() => {
    if (searchParams.get("confid")) {
      SetConfId(searchParams.get("confid"));
    }
  }, []);

  let newb;

  const getb = async () => {
    if (confid.trim() != "") {
      const controller = new AbortController();
      try {
        const response = await axios
          .get(
            `${process.env.REACT_APP_Backend_URL}/bookingconf/confid/${confid}`,
            {
              headers: { "Content-Type": "application/json" },
              // withCredentials: true,
            }
          )
          .then((res) => {
            SetMsg("");
            // console.log(res, "FROM MYBOOKING");
            // isMounted && SetBooking(res.data);
            newb = res?.data?.map((item, index) => {
              let bookinfo = Object.values(item[0].bookitem);
              bookinfo = bookinfo[0];
              const room = item[0].room;
              const newroom = { bookinfo, room };
              // console.log(bookedinfo, "BOOKEDINFO");
              return newroom;
            });
            SetBookedinfo(newb);
          });
        // console.log(response);
        // .catch((err) => console.log(err));
      } catch (err) {
        // console.log(err?.response?.data?.message);
        SetMsg(err?.response?.data?.message);
        // console.log(err?.message);
      }
    } else {
      //   console.log(confid);
      SetMsg("CONFIRMATION ID CANNOT BE EMPTY");
    }
  };

  return (
    <>
      <Hero title={"About Us"} />{" "}
      <FormControl style={{ width: "100%" }}>
        {message && (
          <p style={{ backgroundColor: "red", color: "blue" }}> {message} </p>
        )}
        <FormLabel htmlFor="email">CONFIRMATION ID</FormLabel>

        <TextField
          id="email"
          type="email"
          name="email"
          placeholder="your CONFIRMATION ID "
          autoComplete="email"
          autoFocus
          required
          //   fullWidth
          variant="outlined"
          value={confid}
          onChange={(e) => SetConfId(e.target.value)}
        />
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
          show booking
        </Button>
      </FormControl>
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
