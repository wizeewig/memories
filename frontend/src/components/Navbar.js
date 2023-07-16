import React, {useContext} from 'react';
import logo1 from "../img/logo1.jpg";
import '../css/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

export default function Navbar({login}) {

    const navigate = useNavigate()
    const {setModalOpen} = useContext(LoginContext)

  const loginstatus=()=>{
    const token=localStorage.getItem("jwt");
    if(login || token){
      return[
        <>
         <Link to="/profile"><li>Profile</li></Link>
         <Link to="/createPost"><li>Create Post</li></Link>
         <Link to="/myfollowingpost" style={{ marginLeft: "20px" }}> <li>My Following</li></Link>
         <Link to="">
          <button className='primaryBtn' onClick={()=> setModalOpen(true)}>Logout</button>
         </Link>
        </>
      ]
    }
    else{
      return[
        <>
          <Link to="/signup"><li>Sign Up</li></Link>
          <Link to="/signin"><li>Sign In</li></Link>
        </>
      ]
    }
  }

  const loginstatusMobile=()=>{
    const token=localStorage.getItem("jwt");
    if(login || token){
      return[
        <>
        <Link to="/"><li><span class="material-symbols-outlined">home</span></li></Link>
         <Link to="/profile"><li><span class="material-symbols-outlined">account_circle</span></li></Link>
         <Link to="/createPost"><li><span class="material-symbols-outlined">add_box</span></li></Link>
         <Link to="/myfollowingpost" style={{ marginLeft: "20px" }}> <li><span class="material-symbols-outlined">explore</span></li></Link>
         <Link to="">
          <li  onClick={()=> setModalOpen(true)}><span class="material-symbols-outlined">logout</span></li>
         </Link>
        </>
      ]
    }
    else{
      return[
        <>
          <Link to="/signup"><li>Sign Up</li></Link>
          <Link to="/signin"><li>Sign In</li></Link>
        </>
      ]
    }
  }

  return (
    <div className='navbar'>
        <img id="memorieslogo" src={logo1} alt="logo" onClick={()=>{navigate("/")}} ></img>
        <ul className='nav-menu'>
           {loginstatus()}
        </ul>
        <ul className='nav-mobile'>
           {loginstatusMobile()}
        </ul>
        
    </div>
  )
}
