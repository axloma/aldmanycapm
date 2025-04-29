import React, { Component } from "react";
import items from "../data";
// import Client from "./Contentful";
import Client from '../contentful'
import axios from "axios";

const RoomContext = React.createContext();

export default class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    bookitem:[],
    loading: true,
    contact:[],
    user:null,
    userlogedin:false,
    //
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false

  };


  userlogedin = false
  // aldmanyrooms
  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: "aldmanyrooms"

      });
      let response2 = await Client.getEntries({
        content_type: "contact"
        
      });
      let rooms = this.formatData(response.items);
      // console.log(response.items ,"FROM GETDATA")
      // console.log(response2.items ,"FROM GETDATA")
      let contact = this.formatDatac(response2.items);
      // console.log(contact,"FORMATED")
      let featuredRooms = rooms.filter(room => room.featured === true);
      //
      let maxPrice = Math.max(...rooms.map(item => item.price));
      let maxSize = Math.max(...rooms.map(item => item.size));
      let bookitem = {}

      const getDefaultCart = ()=>{
        let cart ={}     
        // let cart = rooms.map(room=> carti.id =room.id)
          for (let i = 0;i < rooms.length  ;i++ ){
            cart[rooms[i].id]=0
          
          }
          return cart;
      }
      this.bookitem = getDefaultCart();
      
      this.additem = (itemId,number)=>{
        // console.log("ITEM",itemId)
        // console.log(this.bookitem)
        this.bookitem[itemId] =number;
        // console.log(this.bookitem)
        // console.log(typeof(this.bookitem))
      }
     
      this.removeitem = (itemId,number)=>{
        this.bookitem[itemId]=0;
      }

       //user authentication 
       const cuser = (()=>{
        let userProfile = localStorage.getItem("userProfile");
        console.log(userProfile)
        if(userProfile){
          this.userlogedin = true
          return JSON.parse(userProfile)
        }
        this.userlogedin = false
        return null;

      })
      this.user = cuser();
      console.log(this.user,"USER CONTEXT")
      
        this.loginApiCall = async(payload)=>{
          // console.log(payload)
        await axios.post("http://127.0.0.1:3500/auth",payload,{
            withCredentials:true,
            }).then(()=>{
                  alert('WELCOME ')
                 
              })
              .catch((e)=>{
                  console.log(e)
                if (e.response.status == 409 || 401 || 403) {
                  alert('Wrong creadential ')
                }
                
              })
       let apiResponse = await axios.get("http://127.0.0.1:3500/refresh",{
        withCredentials:true,

        }).then((res)=>{
              alert('WELCOME ')
          this.user = res.data.username;
          console.log(res.data)
          localStorage.setItem('userProfile',JSON.stringify(res.data.username));
          this.userlogedin =true
          }).catch((e)=>{
              console.log(e)
            if (e.response.status == 409 || 401 || 403) {
              alert('Wrong creadential ')
              this.userlogedin = false
            }
            
          })
          // console.log(apiResponse)
        return this.userlogedin
      }



      this.setState({
        rooms,
        featuredRooms,
        sortedRooms: rooms,
        loading: false,
        //me
        bookitem:this.bookitem,
        addToCart:this.additem,
        removeFromCart:this.removeitem,
        //contact
        contact:contact,
        //user
        user:this.user,
        loginapi:this.loginApiCall,
        userlogedin:this.userlogedin,
        price: maxPrice,
        maxPrice,
        maxSize
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getData();
    // let rooms = this.formatData(items);
    // let featuredRooms = rooms.filter(room => room.featured === true);
    // //
    // let maxPrice = Math.max(...rooms.map(item => item.price));
    // let maxSize = Math.max(...rooms.map(item => item.size));
    // let bookitem = {}

    // const getDefaultCart = ()=>{
    //   let cart ={}     
    //   // let cart = rooms.map(room=> carti.id =room.id)
    //     for (let i = 0;i < rooms.length  ;i++ ){
    //       cart[rooms[i].id]=0
        
    //     }
    //     return cart;
    // }
    // this.bookitem = getDefaultCart();
    
    // this.additem = (itemId,number)=>{
    //   // console.log("ITEM",itemId)
    //   // console.log(this.bookitem)
    //   this.bookitem[itemId] =number;
    //   // console.log(this.bookitem)
    //   // console.log(typeof(this.bookitem))
    // }
   
    // this.removeitem = (itemId,number)=>{
    //   this.bookitem[itemId]=0;
    // }
    
    // this.setState({
    //   rooms,
    //   featuredRooms,
    //   sortedRooms: rooms,
    //   loading: false,
    //   bookitem:this.bookitem,
    //   addToCart:this.additem,
    //   removeFromCart:this.removeitem,
    //   price: maxPrice,
    //   maxPrice,
    //   maxSize
    // });


  
  
  }
 

  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);

      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }
  formatDatac(items){
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let contact = {...item.fields,id}
      // console.log(contact,"FROM FORMAT")
      return contact
    });
    return tempItems;
  }
  getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room.slug === slug);
    return room;
  };
  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(name, value);

    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };
  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;

    let tempRooms = [...rooms];
    // transform values
    // get capacity
    capacity = parseInt(capacity);
    price = parseInt(price);
    // filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type);
    }
    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }
    // filter by price
    tempRooms = tempRooms.filter(room => room.price <= price);
    //filter by size
    tempRooms = tempRooms.filter(
      room => room.size >= minSize && room.size <= maxSize
    );
    //filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }
    //filter by pets
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true);
    }
    this.setState({
      sortedRooms: tempRooms
    });
    console.log(this.props.childern,"CHILDERN FROM citnext")
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
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}
