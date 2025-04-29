import React from 'react'
import defaultImg from "../images/room-1.jpeg";
import { RoomContext } from "../context/context";
import { useContext } from 'react';
const checkoutrooms = ({room,setIsmodified,info}) => {
    const {addToCart,removeFromCart,bookitem,rooms} = useContext(RoomContext)
    const { name, slug, images, price } = room;
  return (

    <div className=" "  >
    <div className="accomodation_item text-center">
        <div className="hotel_img">
            <img src={images[0] || defaultImg} alt="" className='roomimg'/>
            {/* <a href="#" className="btn theme_btn button_hover">Book Now</a> */}
            <button className="btn theme_btn button_danger"  onClick={()=>{removeFromCart(room.id), setIsmodified(true)} }> cancel  </button>          
       
        </div>
          <a href="#"><h4 className="sec_h4">{name}</h4></a>
        <h5>${price}<small>/night</small></h5>
    </div>
    </div>

 
 
  )
}

export default checkoutrooms