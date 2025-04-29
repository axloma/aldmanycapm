import { useContext } from "react";
import React from 'react'
import { RoomContext } from "../context/context";



const aboutus = () => {
    const {contact} = useContext(RoomContext)
    let  aboutus = "" 
    if (contact != "" || undefined){
        aboutus = contact[0].aboutus
        
    }

  return (
    
        <section className="about_history_area section_gap">
        <div className="container">
            <div className="row">
                <div className="col-md-6 d_flex align-items-center">
                    <div className="about_content ">
                        <h2 className="title title_color">About Us <br/>Our History<br/>Mission & Vision</h2>
                        <p>{aboutus ? aboutus :"inappropriate behavior is often laughed off as “boys will be boy"}</p>
                        <a href="#" className="button_hover theme_btn_two">Request Custom Price</a>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <img className="img-fluid" src="image/about_bg.jpg" alt="img"/>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default aboutus