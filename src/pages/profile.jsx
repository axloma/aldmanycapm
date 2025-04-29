import { Button } from 'bootstrap'
import React from 'react'
import axios from 'axios'
const profile = () => {


const user = async()=>{
     await axios.get("http://127.0.0.1:3500/refresh",{
        withCredentials:true,

        }).then((res)=>{
              alert('WELCOME ')
              console.log(res)
          }).catch((e)=>{
              console.log(e)
            if (e.response.status == 409 || 401 || 403) {
              alert('Wrong creadential ')
            }
            
          })}

          const logout = async()=>{
            await axios.get("http://127.0.0.1:3500/logout",{
               withCredentials:true,
       
               }).then(()=>{
                     alert('WELCOME ')
                 }).catch((e)=>{
                     console.log(e)
                   if (e.response.status == 409 || 401 || 403) {
                     alert('Wrong creadential ')
                   }
                   
                 })}
       
       

  return (
    <section  className="breadcrumb_area">
    <div  className="overlay bg-parallax" data-stellar-ratio="0.8" data-stellar-vertical-offset="0" data-background=""></div>
    <div  className="container">
      <button onClick={user} >profile</button>
      <button onClick={logout} >logout</button>


    </div>
    </section>

  )
}

export default profile
