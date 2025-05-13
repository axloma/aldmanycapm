import React, { Component } from "react";
// import Title from "./Title";
import { RoomContext } from "../context/context";
import Room from "./Room";
import Loading from "./loading";
export default class FeaturedRooms extends Component {
  static contextType = RoomContext;

  render() {
    let { loading, featuredRooms: rooms } = this.context;

    rooms = rooms.map((room) => {
      return <Room key={room.id} room={room} />;
    });
    return (
      <section className="accomodation_area section_gap">
        <div className="container">
          <div className="section_title text-center">
            <h2 className="title_color">{"ROOMS"}</h2>
            {/* <p>{"props.desc"}</p> */}
          </div>
          <div className="row accomodation_two">
            {loading ? <Loading /> : rooms}
          </div>
        </div>
      </section>
    );
  }
}
