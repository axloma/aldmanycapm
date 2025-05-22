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
  const [users, Setusers] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const axiosPrivate = useAxiosPrivate();

  const delcus = async (id) => {
    console.log(localStorage.getItem("token"));
    const token = localStorage.getItem("token");
    setLoading(true);
    const cus = await axiosPrivate.delete(`/customers/${id}`).then(() => {
      Setusers(
        users.filter((user) => {
          return user._id != id;
        })
      );
      setLoading(false);
    });
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    async function getusers() {
      axiosPrivate
        .get(`/customers`, {
          signal: controller.signal,
        })
        .then((res) => {
          console.log(res.data);
          isMounted && Setusers(res.data);
        })
        .catch((err) => console.log(err));
    }
    getusers();

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
