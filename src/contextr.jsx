import React, { Component } from "react";
import items from "./data";
// import Client from "./Contentful";

const RoomContext = React.createContext();
export default class RoomProvider extends Component  {
   
    // state ={};
  render() {
    return (
        <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    )
  }
}
const RoomConsumer = RoomContext.Consumer

// const RoomProvider = createContext();
// const RoomConsumer = RoomProvider.Consumer

export {RoomProvider,RoomConsumer,RoomContext}
// export {RoomProvider}
