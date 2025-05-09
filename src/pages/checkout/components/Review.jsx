import * as React from "react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { RoomContext } from "../../../context/context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

export default function Review({ bookitemr, confid, useremail }) {
  // console.log(bookitemr);
  console.log(useremail, "REVIEW");
  const { bookitem, rooms } = useContext(RoomContext);
  let price = 0;
  let Price = rooms.map((room) => {
    if (bookitem[room.id] != 0) {
      price =
        parseInt(price) + parseInt(`${room.price * bookitem[room.id].room}`);

      return price;
    }
  });
  // const subj = "YOUR PAYMENT HAS Verified";
  // const msg = `<h1>YOUR CONFIRMATION ID ${confid}</h1>`;
  // const automail = async () => {
  //   const result = await axios
  //     .post("http://127.0.0.1:3500/automail", {
  //       useremail,
  //       subj,
  //       msg,
  //     } ,{
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       withCredentials: true,
  //     }

  //   )
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  // const tifOptions = Object.keys(bookitemr).map((key, value) => (
  //   <p key={key}>
  //     {key} :{bookitemr[key]}
  //   </p>
  // ));
  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="ROOM" secondary="ROOM NUMBER" />
          <Typography variant="body2">${price}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          {/* <ListItemText primary="Shipping" secondary="Plus taxes" />
          <Typography variant="body2">$9.99</Typography> */}
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${price}
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            payment details
            {/* {tifOptions} */}
          </Typography>
          {/* <Typography gutterBottom>John Smith</Typography> */}
          <Typography gutterBottom sx={{ color: "text.secondary" }}>
            Confirmation Id {confid}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom></Typography>
          <Grid container>
            <React.Fragment>
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                sx={{ width: "100%", mb: 1 }}
              >
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  {/* {payments.name} */}
                </Typography>
                {/* <Typography variant="body2">{payments.detail}</Typography> */}
              </Stack>
            </React.Fragment>
          </Grid>
        </div>
      </Stack>
    </Stack>
  );
}
