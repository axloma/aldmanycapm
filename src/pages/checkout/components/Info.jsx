import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { RoomContext } from "../../../context/context";
import { useContext, useEffect, useState } from "react";
import Checkoutrooms from "../../../components/checkoutrooms";
import { nanoid } from "nanoid";
const products = [
  {
    name: "Professional plan",
    desc: "Monthly subscription",
    price: "$15.00",
  },
  {
    name: "Dedicated support",
    desc: "Included in the Professional plan",
    price: "Free",
  },
  {
    name: "Hardware",
    desc: "Devices needed for development",
    price: "$69.99",
  },
  {
    name: "Landing page template",
    desc: "License",
    price: "$49.99",
  },
];

// interface InfoProps {
//   totalPrice: string;
// }

export default function Info({ totalPrice }) {
  const { addToCart, removeFromCart, bookitem, rooms } =
    useContext(RoomContext);

  const [ismodified, setIsmodified] = useState(false);
  const [isempty, setIsEmpty] = useState(false);
  useEffect(() => {
    setIsmodified(false);
  }, [ismodified]);
  let price = 0;
  let Price = rooms.map((room) => {
    if (bookitem[room.id] != 0) {
      price =
        parseInt(price) + parseInt(`${room.price * bookitem[room.id].room}`);

      return price;
    }
  });
  if (price === 0) {
    console.log("ZERO");
  }
  const style = {
    backgroundColor: "white",
    fontSize: "1.3rem",
    fontWeight: "bold",
    boxShadow: " 5px 10px 8px 10px #888888",
    color: "black",
  };
  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {price}
        {/* {totalPrice} */}
      </Typography>
      <List disablePadding>
        {rooms.map((room) => {
          if (bookitem[room.id] != 0) {
            const info = `NUMER OF ROOM: ${bookitem[room.id].room} ADULT: ${bookitem[room.id].adult} CHILDERN: ${bookitem[room.id].childern} TOTAL PRICE:  ${room.price * bookitem[room.id].room} `;
            return (
              <div key={nanoid()}>
                <Checkoutrooms
                  room={room}
                  setIsmodified={setIsmodified}
                  info={bookitem[room.id]}
                />
                <p className="info" style={style}>
                  {info}
                </p>
              </div>
            );
          }
        })}
        {/* old items */}
        {/* {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={product.name}
              secondary={product.desc}
            />
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              {product.price}
            </Typography>
          </ListItem>
        ))} */}
      </List>
    </React.Fragment>
  );
}
