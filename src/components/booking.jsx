import React from 'react'
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { DateRange } from 'react-date-range';
import {format} from 'date-fns';
import { useState ,useContext} from 'react';
import Cookies from 'js-cookie';
import { RoomContext } from "../context/context";
import { Link } from 'react-router-dom';

const booking = ({room}) => {
    const [booked,setBooked] = useState(false)

    const [options,setOptions] =useState({
        adult:1,
        childern:0,
        room:1,
        })     
        
    const [openOpetion,setOpenopetion] =useState(false)

    const [date,setDate] =useState([
    {
    startDate:new Date(),
    endDate:new Date(),
    key:"selection"

    }  ])

    const [openDate,setOpenDate] =useState(false)
    const {addToCart,removeFromCart,bookitem} = useContext(RoomContext)
    console.log(bookitem)

function handleOp(name,oper){
    setOptions(prev => ({...prev,[name] : oper === "i" ? options[name] + 1 : options[name] -1 
    
    })) 
}
function setitem(){
    Cookies.set('room', `${room.name}`, { expires: 7 });
    const value = Cookies.get('room');
    addToCart(String(room.id),options)
    setBooked(prev => !prev)


}
function cancel(){
    removeFromCart(String(room.id))
    setBooked(prev => !prev)
}

  return (
    
    <div className="hotel_booking_area position">
    <div className="container">
        <div className="hotel_booking_table">
            <div className="col-md-3">
                <h2>Book<br/> Your Room</h2>
            </div>
            <div className="col-md-9">
                <div className="boking_table">
                    <div className="row rowcustom">
                        <div className="col-md-4">
                            <div className="book_tabel_item">
                                <div className="form-group">
                                    <div className='input-group date' id='datetimepicker11'>
                                        <input type='text' className="form-control" placeholder="Arrival Date" value={format(date[0].startDate,"MM:dd:yyyy")} readOnly onClick={()=>setOpenDate(!openDate)}/>
                                        <span className="input-group-addon">
                                            <i className="fa fa-calendar" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className='input-group date' id='datetimepicker1'>
                                      { openDate && <DateRange 
                                        editableDateInputs={true}
                                        onChange={item => setDate([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={date}
                                        className='date'
                                        />}
                                        <input type='text' className="form-control" placeholder="Departure Date" value={format(date[0].endDate,"MM:dd:yyyy")} readOnly  onClick={()=>setOpenDate(!openDate)} />
                                        <span className="input-group-addon">
                                            <i className="fa fa-calendar" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                     
                        <div className="col-md-4">
                            <div className="book_tabel_item">
                                <div className="options">
                                    <span className="openoptions" onClick={()=>setOpenopetion(!openOpetion)}>{`${options.adult} adult . ${options.childern} childern .${options.room} room`  }</span>
                                   {openOpetion && 
                                    <div className="optionsitem">
                                        <div className="optioncontainer">                                                      
                                                <span className="item">adult</span>
                                                <div className="btn btninc">
                                                <button className="enc"  onClick={()=>handleOp("adult","i")}>+</button>
                                                <span className="number">{options.adult}</span>
                                                <button className="dec" onClick={()=>handleOp("adult","d")} disabled={options.adult <=1}>-</button>
                                                </div>
                                     
                                        </div>
                                        <div className="optioncontainer">
                                                <span className="item">childern</span>
                                                <div className="btn btninc">
                                                    <button className="inc" onClick={()=>handleOp("childern","i")}>+</button>
                                                <span className="number" >{options.childern}</span>
                                                    <button className="dec" onClick={()=>handleOp("childern","d")} disabled={options.childern <=0}>-</button>
                                                </div>
                                        </div>
                                        <div className="optioncontainer">
                                                <span className="item">room</span>
                                                <div className="btn btninc">
                                                <button className="enc" onClick={()=>handleOp("room","i" )} >+</button>
                                                <span className="number">{options.room}</span>
                                                <button className="dec" onClick={()=>handleOp("room","d" )}disabled={options.room <=1}>-</button>
                                                </div>
                                        </div>
                                    </div>
                                    }
                                    
                                </div>
                                
                            </div>
                        </div>
                            <div className="col-md-3">
                        { !booked ?
                        <button className="book_now_btn button_hover"onClick={setitem}> <Link to='/checkout'> Book Now </Link></button>
                            :
                        <button className="book_now_btn button_hover"onClick={cancel}> cancel</button>
                        }
                        </div>
                      
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default booking