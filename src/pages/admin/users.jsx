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
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function BasicTable() {
  const [users, Setusers] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    async function getusers() {
      axiosPrivate
        .get(`/users`, {
          signal: controller.signal,
        })
        .then((res) => {
          console.log(res.data);
          isMounted && Setusers(res.data);
        })
        .catch((err) => console.log(err));
    }
    getusers();
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
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {/* <TableCell>My Bookings</TableCell> */}
                  <TableCell align="right">UserID</TableCell>
                  <TableCell align="right">username</TableCell>
                  <TableCell align="right">userRoles</TableCell>
                  <TableCell align="right">userip</TableCell>
                  <TableCell align="right">user_email</TableCell>
                  <TableCell align="right">user_phone</TableCell>
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
                      {" "}
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
