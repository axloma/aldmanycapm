import { useState } from "react";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
  const [rooms, setRooms] = useState([
    { name: "Double Deluxe Room", price: 250, imgsrc: "./image/room1.jpg" },
    { name: "Single Deluxe Room", price: 200, imgsrc: "image/room2.jpg" },
    { name: "honey moon sweet", price: 750, imgsrc: "image/room3.jpg" },
    { name: "echonomey double", price: 250, imgsrc: "image/room4.jpg" },
  ]);
  return (
    <section className="breadcrumb_area">
      <div
        className="overlay bg-parallax"
        data-stellar-ratio="0.8"
        data-stellar-vertical-offset="0"
        data-background=""
      ></div>
      <div className="container">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>My Bookings</TableCell>
                <TableCell align="right">Date & Timings</TableCell>
                <TableCell align="right">CheckIn</TableCell>
                <TableCell align="right">CheckOut</TableCell>
                <TableCell align="right">Adult</TableCell>
                <TableCell align="right">Childern</TableCell>
                <TableCell align="right">Payment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                  <TableCell align="right" height="30vh">
                    {" "}
                    <img src={row.imgsrc} height="30vh" />{" "}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </section>
  );
}
