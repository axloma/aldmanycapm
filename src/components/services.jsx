import React from 'react'
import { useState } from 'react'
import { nanoid } from 'nanoid'
import defaultImg from '../images/defaultBcg.jpeg'
import {FaBeer,FaHiking,FaSwimmer,FaShuttleVan} from "react-icons/fa"
const services = () => {
    const [facilities,setFacilities] = useState([
                                                // {name:"Restaurant",desc:"Usage of the Internet is becoming more ",iClass:"lnr lnr-dinner",img:"../images/blog/blog-1.jpg"},
                                                // {name:"sport",desc:"Usage of the Internet is becoming more ",iClass:"lnr lnr-bicycle",img:null},
                                                // {name:"swimming",desc:"Usage of the Internet is becoming more ",iClass:"lnr lnr-shirt",img:"./image/blog/blog-1.jpg"},
                                                {name:"swimming",desc:"Usage of the Internet is becoming more ",iClass:FaSwimmer,img:"./image/blog/blog-1.jpg"}
                                                ])


  return (
    <> 
    {/* <!--================ Facilities Area  =================--> */} 
  <section className="facilities_area section_gap" id="services">
      <div className="overlay bg-parallax" data-stellar-ratio="0.8" data-stellar-vertical-offset="0" data-background="">  
      </div>
      <div className="container">
          <div className="section_title text-center">
              <h2 className="title_w">Royal Facilities</h2>
              <p>Who are in extremely love with eco friendly system.</p>
          </div>

          <div className="row mb_30">
              {/* TODO: autogenerate facility  */}
              {facilities.map((fac,index) => 

                  <div className="col-lg-4 col-md-6" key={nanoid()}>
                      <div className="facilities_item">
                          {/* <h4 className="sec_h4"><i className={fac.iClass}></i>{fac.name}</h4> */}
                          <h4 className="sec_h4"><span className='icons'><fac.iClass/></span>  {fac.name}</h4>
                          <img src={fac.img || defaultImg}  alt=""  className="img-fluid" />
                          <p>{fac.desc}.</p>
                      </div>
                  </div>
                                      
              )} 
          </div>
      </div>
  </section>
  {/* {/* <!--================ Facilities Area  =================--> */}

</>
 
  )
}

export default services