import React from 'react'
import { nanoid } from 'nanoid'
import Loading from './components/loading'
import defaultImg from './images/defaultBcg.jpeg'
import { Link } from 'react-router-dom'
import PropTypes from "prop-types" 
import {memo} from 'react'
const allrooms = ({rooms,title, }) => {
    console.log(rooms,"rooms from room")
    const {name,slug,images,price}=rooms;
    // console.log(slug,"slog from rooms")
    // console.log(room,"room after slug rooms")
  return (

        
    <section  className="accomodation_area section_gap">
    <div  className="container">
        <div  className="section_title text-center">
            <h2  className="title_color">{title}</h2>
            {/* <p>{props.desc}</p> */}
        </div>
        <div  className="row accomodation_two">
            {/* TODO: generate accomedation */}

            { rooms.map((room,index)=>

            <div className="col-lg-3 col-sm-6" key={nanoid()} >
            <div className="accomodation_item text-center">
                <div className="hotel_img">
                    <img src={room.imgsrc || defaultImg} alt="" className='roomimg'/>
                    {/* <a href="#" className="btn theme_btn button_hover">Book Now</a> */}
                    <Link to={`/rooms/${room.slug}`} href="#" className="btn theme_btn button_hover">Book Now</Link>
                    
                </div>
                <a href="#"><h4 className="sec_h4">{room.name}</h4></a>
                <h5>${room.price}<small>/night</small></h5>
            </div>
            </div>

            )}

        </div>
    </div>
</section>
            

  )
}

export default allrooms

// allrooms.protoTypes  ={
//     room:PropTypes.shape({
//         name:PropTypes.string.isRequired,
//         slug:PropTypes.string.isRequired,
//         images: PropTypes.arrayOf(PropTypes.string).isRequired,
//         price:PropTypes.number.isRequired,
//     })
// }