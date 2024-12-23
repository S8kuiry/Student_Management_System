


import React from 'react'
import './Navbar.css'
import { IoMdOpen } from "react-icons/io";
import { FaRegWindowClose } from "react-icons/fa";

const getUrl = ()=>{
  const url = window.location.href;
  const idd = url.split('/').pop();
  return idd;
}


var d = 0;
const openSbar = ()=>{
  const links =Array.from(document.getElementsByClassName("nav_a"));
  
  const sbar = document.getElementsByClassName("navbar")[0];
  
  if(d === 0){
    
    sbar.style.width = "150px";
    sbar.style.transition = "0.5s";
    links.forEach((itm)=>{
      itm.style.opacity="1";
      itm.style.transition="opacity 0.7s";
    })
    d = 1;
  }else{
    
    sbar.style.width = "50px";
    sbar.style.transition = "0.5s";
    links.forEach((itm)=>{
      itm.style.opacity="0";
      itm.style.transition="opacity 0.7s";
    })
    d = 0;

  }
}


const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="nav_top">
      <IoMdOpen id="nav_open"  onClick={openSbar} />

      </div>
      <div className="nav_links">
        <a href={`/home/${window.location.href.split('/').pop()}`} className='nav_a'>Home</a>
        <a href={`/studentform/${window.location.href.split('/').pop()}`} className='nav_a'>Student Form</a>
        <a href={`/displaystatus/${window.location.href.split('/').pop()}}`} className='nav_a'>Display Status</a>
        <a href='/' className='nav_a'>Log Out</a>
      </div>
      



        
      
    </div>
  )
}

export default Navbar
