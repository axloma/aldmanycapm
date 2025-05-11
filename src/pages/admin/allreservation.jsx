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
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  const [booking, SetBooking] = useState([]);
  const [loading, setLoading] = React.useState(false);

  async function getAllbooking() {
    await axios
      .get(`${process.env.REACT_APP_Backend_URL}/booking`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        SetBooking(res.data);
      });
  }
  const delB = async (id) => {
    console.log(localStorage.getItem("token"));
    const token = localStorage.getItem("token");
    setLoading(true);
    const cus = await axios
      .delete(`${process.env.REACT_APP_Backend_URL}/booking/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then(() => {
        getAllbooking();
        setLoading(false);
        // Setusers(
        //   users.filter((item, i) => {
        //     item._id !== id;
        //   })
        // );
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    getAllbooking();
    console.log(booking);
  }, []);

  //   console.log(allusers);
  //   console.log(users, "USER2");
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
