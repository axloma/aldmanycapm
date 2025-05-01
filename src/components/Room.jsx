import React from "react";
import { Link } from "react-router-dom";
import defaultImg from "../images/room-1.jpeg";
import PropTypes from "prop-types";
import { memo } from "react";
import { nanoid } from "nanoid";
const Room = memo(({ room }) => {
  const { name, slug, images, price } = room;
  console.log(name);
  return (
   
           <>

            <div className="col-lg-3 col-sm-6"  >
            <div className="accomodation_item text-center">
                <div className="hotel_img">
                    <img src={`https:`+images[0] || defaultImg} alt="" className='roomimg'/>
                    {/* <a href="#" className="btn theme_btn button_hover">Book Now</a> */}
                    <Link to={`/rooms/${String(slug).replaceAll(" ","-")}`} className="btn theme_btn button_hover">Book Now</Link>          
                </div>
                <Link to={`/rooms/${String(slug).replaceAll(" ","-")}`} className="btn theme_btn button_hover">{name}</Link>          

                  {/* <a href="#"><h4 className="sec_h4">{name}</h4></a> */}
                <h5>${price}<small>/night</small></h5>
            </div>
            </div>

         
            </>
// }
);
  })
Room.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired
  })
};
export default Room;
