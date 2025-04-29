import React from "react";
import { withRoomConsumer } from "../context/context";
import Loading from "./loading";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";

function RoomContainer({ context }) {
  const { loading, sortedRooms, rooms } = context;
  console.log (rooms)
  if (loading) {
    return <Loading />;
  }
  return (
    <section  className="accomodation_area section_gap">
      <div  className="container">
        <div  className="section_title text-center">
            <h2  className="title_color">{"titlex"}</h2>
            {/* <p>{props.desc}</p> */}
        </div>
      <div  className="row accomodation_two">
    
        <RoomsFilter rooms={rooms} />
        <RoomsList rooms={sortedRooms} />
      </div>
      </div>
    </section>
  );
}

export default withRoomConsumer(RoomContainer);

// import React from "react";
// import { RoomConsumer } from "../context";
// import Loading from "./Loading";
// import RoomsFilter from "./RoomsFilter";
// import RoomsList from "./RoomsList";
// export default function RoomContainer() {
//   return (
//     <RoomConsumer>
//       {value => {
//         const { loading, setRoom, sortedRooms,rooms } = value;
//         if (loading) {
//           return <Loading />;
//         }
//         return (
//           <>
//             <RoomsFilter rooms={rooms} />
//             <RoomsList rooms={sortedRooms} setRoom={setRoom} />
//           </>
//         );
//       }}
//     </RoomConsumer>
//   );
// }
