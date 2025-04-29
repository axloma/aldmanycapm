import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Tabs from './tabs'
import { useContext } from 'react';
import { RoomContext } from "../context/context";
const nave = () => {

const [isOpen,setIsOpen] =useState(false)

const handleNave =()=>{
    setIsOpen(prev=>!prev)
    // setIsOpen(!isOpen)

}
    const {user,userlogedin} = useContext(RoomContext)
    let cuser = user
    console.log(user,"USERNAV")
    console.log(cuser)
  return (
       <>

    <header className="header_area">
       <div className="container">
           <nav className="navbar navbar-expand-lg navbar-light">
               {/* <!-- Brand and toggle get grouped for better mobile display --> */}
               <Link to="/" className="nav-link" onClick={handleNave}><img src="image/Logo.png" alt=""/></Link>
               {/* <a className="navbar-brand logo_h" href="index.html"><img src="image/Logo.png" alt=""/></a> */}
               <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={!isOpen? "false":"true"} aria-label="Toggle navigation" onClick={handleNave}>
                   <span className="icon-bar"></span>
                   <span className="icon-bar"></span>
                   <span className="icon-bar"></span>
               </button>
               {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
               {/* navbar-collapse offset collapse */}
               <div className={ isOpen ? "navbar-collapse offset collapse show" :"navbar-collapse offset collapse" } id="navbarSupportedContent">
               {/* <div className={"navbar-collapse offset collapse" } id="navbarSupportedContent"> */}

                   <ul className="nav navbar-nav menu_nav ml-auto">

                       {/* <li className="nav-item active"><a className="nav-link" href="index.html">Home</a></li>  */}
                       <li className="nav-item active"><Link to="/" className="nav-link" href="index.html" onClick={handleNave}>Home</Link></li> 

                       {/* <li className="nav-item"><a className="nav-link" href="about.html">About us</a></li> */}
                       <li className="nav-item"><Link to="/about" className="nav-link" href="about.html" onClick={handleNave} >About us</Link></li>

                       {/* <li className="nav-item"><a className="nav-link" href="accomodation.html">Accomodation</a></li> */}
                       <li className="nav-item"><Link to="/accomodation" className="nav-link" href="accomodation.html" onClick={handleNave}>Accomodation</Link></li>

                       {/* <li className="nav-item"><a className="nav-link" href="gallery.html">Gallery</a></li> */}
                       <li className="nav-item"><Link to="/gallery" className="nav-link" href="gallery.html" onClick={handleNave}>Gallery</Link></li>
                    
                       <li className="nav-item"><Link to="/checkout" className="nav-link" >checkout</Link></li>
                        {userlogedin ? 
                       <li className="nav-item"><Link to="/profile" className="nav-link" >profile</Link></li>
                      : <li className="nav-item"><Link to="/login"  className="nav-link" onClick={handleNave}>Login</Link> </li>

                        }

{/*                       
                       <li className="nav-item submenu dropdown">
                           <Link to="/blog" href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" onClick={handleNave}>Blog</Link>
                           <ul className="dropdown-menu"> */}
                               {/* <li className="nav-item"><a className="nav-link" href="blog.html">Blog</a></li> */}
                               {/* <li className="nav-item"><Link to="/checkout" className="nav-link" href="blog.html">Blog</Link></li> */}
                               {/* <li className="nav-item"><a className="nav-link" href="blog-single.html">Blog Details</a></li> */}
                               {/* <li className="nav-item"><Link to="/singleBlog" className="nav-link" href="blog-single.html">Blog Details</Link></li> */}

                           {/* </ul>
                       </li>  */}
                       {/* <li className="nav-item"><a className="nav-link" href="elements.html">Elemests</a></li> */}
                     
                       {/* <li className="nav-item"><a className="nav-link" href="contact.html">Contact</a></li> */}
                  
                       <li className="nav-item"><Link to="/contact"  className="nav-link" onClick={handleNave}>Contact</Link> </li>
                       {/* <li className="nav-item"><Link to="/login"  className="nav-link" onClick={handleNave}>Login</Link> </li> */}



                   </ul>
               </div> 
           </nav>
       </div>
   </header>

</>
 
   
  )
}

export default nave