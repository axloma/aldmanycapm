import React from "react";
import { withRoomConsumer } from "../context/context";
import Loading from "./loading";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";

function RoomContainer({ context }) {
  const { loading, sortedRooms, rooms } = context;
  if (loading) {
    return <Loading />;
  }
  return (
    <section className="accomodation_area section_gap">
      <div className="container">
        <div className="section_title text-center">
          <h2 className="title_color">{"All Rooms "}</h2>
          {/* <p>{props.desc}</p> */}
        </div>
        <div className="row accomodation_two">
          <RoomsFilter rooms={rooms} />
          <RoomsList rooms={sortedRooms} />
        </div>
      </div>
    </section>
  );
}

export default withRoomConsumer(RoomContainer);
