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
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function BasicTable() {
  const [booking, SetBooking] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const axiosPrivate = useAxiosPrivate();

  const delB = async (id) => {
    setLoading(true);
    const cus = await axiosPrivate
      .delete(`/booking/${id}`)
      .then(() => {
        SetBooking(
          booking.filter((book) => {
            return book._id != id;
          })
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    async function getAllbooking() {
      axiosPrivate
        .get(`/booking`, {
          signal: controller.signal,
        })
        .then((res) => {
          console.log(res.data);
          isMounted && SetBooking(res.data);
        });
    }
    getAllbooking();
    console.log(booking);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <section className="breadcrumb_area">
      <div
        className="overlay bg-parallax"
        data-stellar-ratio="0.8"
        data-stellar-vertical-offset="0"
        data-background=""
      ></div>
      <div className="container">
        {booking && (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 450 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">BookingID</TableCell>
                    <TableCell align="right">CustomerID</TableCell>
                    <TableCell align="right">date</TableCell>
                    <TableCell align="right">roomdetails</TableCell>
                    <TableCell align="right">paymentID</TableCell>
                    <TableCell align="right">confirmation</TableCell>
                    <TableCell align="right">confirmationid</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {booking.map((user) => (
                    <TableRow
                      key={nanoid()}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {user._id}
                      </TableCell>
                      <TableCell align="right">{user.UserId}</TableCell>
                      {/* <TableCell align="right"></TableCell> */}
                      <TableCell align="right">{user.date}</TableCell>
                      <TableCell align="right">
                        {JSON.stringify(user?.room[0]?.bookitem)}
                      </TableCell>
                      <TableCell align="right">
                        {JSON.stringify(user?.payment[0]?.id)}
                      </TableCell>
                      <TableCell align="right">{user.confirmation}</TableCell>
                      <TableCell align="right">{user.confId}</TableCell>

                      <TableCell align="right" height="30vh">
                        <Tooltip title="Click to see loading">
                          <IconButton
                            onClick={() => delB(user._id)}
                            loading={loading}
                          >
                            <ShoppingCartIcon />
                          </IconButton>
                        </Tooltip>{" "}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </div>
    </section>
  );
}
