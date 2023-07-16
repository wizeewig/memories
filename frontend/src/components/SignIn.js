import React from 'react'
import "../css/SignIn.css";
import logo1 from "../img/logo1.jpg"
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { LoginContext } from '../context/LoginContext';

export default function SignIn() {

    const {setuserLogin}=useContext(LoginContext)
  const navigate = useNavigate()

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

      //Toast function
      const notifyA = (msg)=> toast.error(msg) 
      const notifyB = (msg)=> toast.success(msg) 

      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const postData=()=> {

    //checking email
   if (!emailRegex.test(email)) {
       notifyA("Invalid email")
       return
     }

       //Sending data to server
       fetch("/signin",{
           method:"post",
           headers:{
               "Content-Type":"application/json"
           },
           body:JSON.stringify({
               email:email,
               password:password
           })
       }).then(res=>res.json())
       .then(data =>{
           if(data.error){
           notifyA(data.error)
       } else{
           notifyB("Signed In Successfully")
           localStorage.setItem("jwt",data.token)
           localStorage.setItem("user",JSON.stringify(data.user))
           setuserLogin(true)
           navigate("/")
       }
           console.log(data)})
   }

  return (
    <div className='signin'>
        <div>
            <div className='loginForm'>
            <img className='signUpLogo' src={logo1} alt='logo'></img>
            <div>
                 <div>
                 <input type="email" name="email" id="email" placeholder="Email"  value={email} onChange={(e)=>{setemail(e.target.value)}}></input>
                 </div>
                 <div>
                 <input type="password" name="password" id="password" placeholder="Password"  value={password} onChange={(e)=>{setpassword(e.target.value)}}></input>
                 </div>
                 <div>
                 <input type="submit" id="login-btn" value="Sign In" onClick={()=>{postData()}}></input>
                </div>
            </div>
            </div>
            <div className='loginForm2'>
                Don't have an account?
                <Link to="/signup">
                <span style={{color:"blue", cursor:"pointer", paddingLeft:"5px"}}>Sign Up</span>
                </Link>
            </div>
        </div>
    </div>
  )
}
