import React, { Component } from "react";
import items from "../data";
// import Client from "./Contentful";
import Client from "../contentful";
import axios from "axios";

const RoomContext = React.createContext();

export default class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    bookitem: [],
    loading: true,
    contact: [],
    user: null,
    Admin: false,
    userlogedin: false,
    //
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  };

  userlogedin = false;
  Admin = false;
  // aldmanyrooms
  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: "aldmanyrooms",
      });
      let response2 = await Client.getEntries({
        content_type: "contact",
      });
      let rooms = this.formatData(response.items);

      let contact = this.formatDatac(response2.items);
      let featuredRooms = rooms.filter((room) => room.featured === true);
      //
      let maxPrice = Math.max(...rooms.map((item) => item.price));
      let maxSize = Math.max(...rooms.map((item) => item.size));
      let bookitem = {};

      const getDefaultCart = () => {
        let cart = {};
        // let cart = rooms.map(room=> carti.id =room.id)
        for (let i = 0; i < rooms.length; i++) {
          cart[rooms[i].id] = 0;
        }
        return cart;
      };
      this.bookitem = getDefaultCart();

      this.additem = (itemId, number) => {
        this.bookitem[itemId] = number;
      };

      this.removeitem = (itemId, number) => {
        this.bookitem[itemId] = 0;
      };

      //user authentication
      const cuser = () => {
        let userProfile = localStorage.getItem("userProfile");
        if (userProfile) {
          this.userlogedin = true;
          return JSON.parse(userProfile);
        }
        this.userlogedin = false;
        return null;
      };
      this.user = cuser();

      if (this.user?.Admin) {
        this.Admin = true;
      }

      this.loginApiCall = async (payload) => {
        const res = await axios.post(
          `${process.env.REACT_APP_Backend_URL}/auth`,
          payload,
          {
            withCredentials: true,
          }
        );
        // .then(alert("welcome"));

        const apiResponse = await axios
          .get(`${process.env.REACT_APP_Backend_URL}/refresh`, {
            withCredentials: true,
          })
          .then((res) => {
            this.user = res.data.user;

            this.userlogedin = true;
            localStorage.setItem("userProfile", JSON.stringify(res.data.user));
            localStorage.setItem("token", res.data.accessToken);
          });

        return this.userlogedin;
      };
      this.logoutApiCall = async () => {
        localStorage.removeItem("userProfile");
        localStorage.removeItem("token");
        // localStorage.clear();
        this.user = null;
        this.userlogedin = false;
        this.Admin = false;
        await axios.get(`${process.env.REACT_APP_Backend_URL}/logout`, {
          withCredentials: true,
        });
      };
      this.handleuser = () => {
        // userlogedin = this.userlogedin;
        return this.userlogedin;
      };
      this.isAdmin = (e) => {
        return this.Admin;
      };
      this.setState({
        rooms,
        featuredRooms,
        sortedRooms: rooms,
        loading: false,
        //me
        bookitem: this.bookitem,
        addToCart: this.additem,
        removeFromCart: this.removeitem,
        //contact
        contact: contact,
        //user
        user: this.user,
        apilogin: this.loginApiCall,
        apilogout: this.logoutApiCall,
        userlogedin: this.userlogedin,
        Admin: this.isAdmin,
        handleuserChange: this.handleuser,
        price: maxPrice,
        maxPrice,
        maxSize,
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getData();
  }

  formatData(items) {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);

      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }
  formatDatac(items) {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let contact = { ...item.fields, id };
      return contact;
    });
    return tempItems;
  }
  getRoom = (slug) => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find((room) => room.slug === slug);
    return room;
  };
  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState(
      {
        [name]: value,
      },
      this.filterRooms
    );
  };
  filterRooms = () => {
    let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } =
      this.state;

    let tempRooms = [...rooms];
    // transform values
    // get capacity
    capacity = parseInt(capacity);
    price = parseInt(price);
    // filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter((room) => room.type === type);
    }
    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    }
    // filter by price
    tempRooms = tempRooms.filter((room) => room.price <= price);
    //filter by size
    tempRooms = tempRooms.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );
    //filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter((room) => room.breakfast === true);
    }
    //filter by pets
    if (pets) {
      tempRooms = tempRooms.filter((room) => room.pets === true);
    }
    this.setState({
      sortedRooms: tempRooms,
    });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}
const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {(value) => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}
