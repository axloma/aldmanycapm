import Form from '../components/Form.jsx'
import { useForm } from "react-hook-form";
import bgMainMobile from "../assets/image/bg-main-mobile.png";
import bgMainDesktop from "../assets/image/bg-main-desktop.png";
import Room from "../components/Room"
import { RoomContext } from "../context/context";
import { useContext, useEffect, useState } from 'react';
import Checkoutrooms from '../components/checkoutrooms.jsx';
import { nanoid } from 'nanoid';
import Card from "../components/Card"
const checkout = () => {
  const {addToCart,removeFromCart,bookitem,rooms} = useContext(RoomContext)

  const [ismodified,setIsmodified] = useState(false)
  const [isempty,setIsEmpty] = useState(false)
  useEffect((
  )=>{ 
    setIsmodified(false)


  },[ismodified ])
    const {
        watch,
        register,
        reset,
        control,
        formState: { errors },
        handleSubmit,
      } = useForm({
        shouldUseNativeValidation: true,
        defaultValues: {
          email:"",
          phone:"",
          cardholderName: "",
          number: "",
          expMonth: "",
          expYear: "",
          cvc: "",
        },
      });

      const style = {
        backgroundColor:"white",
        fontSize:"1.3rem",
        fontWeight:"bold",
        boxShadow:" 5px 10px 8px 10px #888888"

      }
      let price = 0
      let Price = rooms.map(room=>{
        if(bookitem[room.id]!=0){
           price =  parseInt(price) + parseInt(`${room.price * bookitem[room.id].room}`)
           
          return price
        }
      
      })
      if( price === 0){
        console.log("ZERO")
      }
    //  price == 0 ? setIsEmpty(true) : null 

  return (
    <section className="about_history_area section_gap checkout">
      {/* <Card cardData={watch()}/> */}
        <div className="checkoutroom">
        <p className="info" style={style}>TOTAL PRICE:{price}</p>
           {rooms.map(room=>{
            if(bookitem[room.id]!=0){
             
              const info = `NUMER OF ROOM: ${bookitem[room.id].room} ADULT: ${bookitem[room.id].adult} CHILDERN: ${bookitem[room.id].childern} TOTAL PRICE:  ${room.price * bookitem[room.id].room} `;
              return<div key={nanoid()}>
           
              <Checkoutrooms room={room} setIsmodified={setIsmodified} info={bookitem[room.id]}/>
              <p className="info" style={style}>{info}</p>
              </div>
            }
           })}
        </div>
        <div className="checkoutitem">
        
           { !isempty &&  <Form {...{ handleSubmit, control, errors, register, reset }} watch={watch} />}
        </div>

    </section>
  )
}

export default checkout