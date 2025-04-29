import React,{createContext, useState,useContext, useEffect} from 'react'
import { RoomContext } from "./context";


export const Bookcontext = createContext(null);

export const BookContextprovider = (props) => {
    const [bookitem,setBookItem] =useState()
    const context = useContext(RoomContext);
    const {rooms} = context
    console.log(rooms.length)

        console.log(rooms,"ROOM FROM BOOKING")
  
    const getDefaultCart = ()=>{
        let cart ={}
        for (let i = 1;i < rooms.length +1;i++ ){
          cart[i]=0
        }
        return cart;
    }
    const addToCart = (itemId)=>{
      setBookItem((prev)=> ({...prev,[itemId]: prev[itemId] +1}));
    }

    const removFromCart = (itemId)=>{
      setBookItem((prev)=> ({...prev,[itemId]: prev[itemId] +1}));
    }
    const contextValue = {bookitem,addToCart,removFromCart}
  return (
  
  <BookContextprovider value={contextValue}>
    
    {props.childern}
  
  
  </BookContextprovider>

  )}

