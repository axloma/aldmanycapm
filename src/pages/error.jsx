import React from 'react'
import { Link } from 'react-router-dom'
function error() {
  return (
    <>
    <section className='Error'>
        <div>    
              <span> <strong>404</strong> erro page not found</span> <br/>
       </div>
 
      <div> <Link to="/" > <i>HOME</i></Link></div>
    </section>
        
    r</>
  )
}

export default error