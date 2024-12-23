
import React from 'react'
import './FrontPage.css'

const FrontPage = () => {
    const page = ()=>{
        window.location.href = '/signup'
    }
  return (
    <div className='front'>
        <h1 style={{color:"whitesmoke"}}>Welcome To Student Management System</h1>


        <div className="front_content">
            <h3 style={{color:"whitesmoke"}}>Welcome User</h3>
            <button onClick={page} className='front_btn'>Sign In</button>
            <button onClick={page} className='front_btn'>Log  In</button>
        </div>
      
    </div>
  )
}

export default FrontPage
