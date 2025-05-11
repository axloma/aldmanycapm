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
import jwtInterceptor from "../../components/jwtintercept";
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
  const [users, Setusers] = useState([]);
  const [loading, setLoading] = React.useState(false);
  async function getusers() {
    jwtInterceptor
      .get(`${process.env.REACT_APP_Backend_URL}/customers`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        Setusers(res.data);
      });
  }

  const delcus = async (id) => {
    console.log(localStorage.getItem("token"));
    const token = localStorage.getItem("token");
    setLoading(true);
    const cus = await axios
      .delete(`${process.env.REACT_APP_Backend_URL}/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then(() => {
        getusers();
        setLoading(false);
        // Setusers(
        //   users.filter((item, i) => {
        //     item._id !== id;
        //   })
        // );
      });
  };
  // async function getusers() {
  //   await axios
  //     .get("http://127.0.0.1:3500/customers", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       Setusers(res.data);
  //     });
  // }
  useEffect(() => {
    getusers();
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
        {users && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 450 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {/* <TableCell>My Bookings</TableCell> */}
                  <TableCell align="right">CustomerID</TableCell>
                  <TableCell align="right">Customername</TableCell>
                  <TableCell align="right">CustomerRoles</TableCell>
                  <TableCell align="right">Customerip</TableCell>
                  <TableCell align="right">Customer_email</TableCell>
                  <TableCell align="right">Customer_phone</TableCell>
                  <TableCell align="right">Creation Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={nanoid()}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user._id}
                    </TableCell>
                    <TableCell align="right">{user.username}</TableCell>
                    <TableCell align="right">
                      {JSON.stringify(Object.keys(user.roles))}
                    </TableCell>
                    <TableCell align="right">{user.ip}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.phone}</TableCell>
                    <TableCell align="right">{user.date}</TableCell>

                    <TableCell align="right" height="30vh">
                      <Tooltip title="Click to see loading">
                        <IconButton
                          onClick={() => delcus(user._id)}
                          loading={loading}
                        >
                          <ShoppingCartIcon />
                        </IconButton>
                      </Tooltip>{" "}
                      {/* <img src={user.imgsrc} height="30vh" />{" "} */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </section>
  );
}
