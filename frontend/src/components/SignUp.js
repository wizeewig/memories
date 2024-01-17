import React from 'react'
import { useEffect, useState } from 'react';
import logo1 from "../img/logo1.jpg"
import '../css/SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SignUp() {

    const navigate = useNavigate()
    const [name, setname] = useState("")
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    
    //Toast function
    const notifyA = (msg)=> toast.error(msg) 
    const notifyB = (msg)=> toast.success(msg) 

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    const postData=()=> {

     //checking email
     const index = email.indexOf("@");
     const substring = email.substring(index + 1);
     //console.log(substring)
    if (!emailRegex.test(email)) {
        notifyA("Invalid email")
        return
      } else if (!passRegex.test(password)) {
        notifyA("Password must contain at least 8 characters, including at least 1 number and 1 includes both lower and uppercase letters and special characters for example #,?,!")
        return
      }
      else if(substring!=("mmmut.ac.in")){
        notifyA("Please use college Email Id")
        return
      }

        //Sending data to server
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:name,
                username:username,
                email:email,
                password:password
            })
        }).then(res=>res.json())
        .then(data =>{
            if(data.error){
            notifyA(data.error)
        } else{
            notifyB(data.message)
            navigate("/signin")
        }
            console.log(data)})
    }

  return (
    <div className='signUp'>
        <div className='form-container'>

            <div className='form'>
            <img className='signUpLogo' src={logo1} alt='logo'></img>
            <p className="loginPara">Sign Up to see photos and videos <br/>from your friends </p>
            <div>
                <input type="email" name="email" id="email" placeholder='Email' value={email} onChange={(e)=>{setemail(e.target.value)}}></input>
            </div>
            <div>
                <input type="text" name="name" id="name" placeholder='Full Name'  value={name} onChange={(e)=>{setname(e.target.value)}}></input>
            </div>
            <div>
                <input type="text" name="username" id="username" placeholder='Username'  value={username} onChange={(e)=>{setusername(e.target.value)}}></input>
            </div>
            <div>
                <input type="password" name="password" id="password" placeholder='Password'  value={password} onChange={(e)=>{setpassword(e.target.value)}}></input>
            </div>
            <p className='loginPara' style={{fontSize:"12px", margin:"3px 0px"}}>By signing up, you agree to our Terms, <br/> privacy policy and cookies policy </p>
            <input type="submit" id="submit-btn" value="Sign Up" onClick={()=>{postData()}}></input>
            </div>

            <div className='form2'>
                Already have an account?
                <Link to="/signin">
                <span style={{color:"blue", cursor:"pointer",  paddingLeft:"5px"}}>Sign In</span>
                </Link>
            </div>
        </div>
        
    </div>
  )
}
