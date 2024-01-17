const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const USER = mongoose.model("USER")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const {Jwt_secret } = require("../keys");
const requireLogin = require('../middlewares/requireLogin');


router.post("/signup",(req,res)=>{
    const{ name,username,email,password} = req.body;
    if(!name || !username || !email || !password){
       return res.status(422).json({error:"Please add all the fields"})
    }
    USER.findOne({$or:[{email:email},{username:username}]}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User already exists with that Email or Username"})
        }
        else{
            
            bcrypt.hash(password,12).then((hashedPassword)=>{

                const user = new USER({
                    name,email,username,password:hashedPassword
                })
            
                user.save()
                .then(user=> {res.json({message: "Signed Up successfully"})})
                .catch(err=> { console.log(err)})    
            })
           
        }
      
    })

})

router.post("/signin",(req,res) =>{
    const{email,password} = req.body;
    if(!email || !password){
        return res.status(422).json({error:"Please add email and password"})
     }
     USER.findOne({email:email}).then((savedUser)=> {
        if(!savedUser){
            return res.status(422).json({error:"Invalid email"})
        }
        bcrypt.compare(password,savedUser.password).then((match)=>{
            if(match){
                // return res.status(200).json({message:"Signed In successfully"})
                const token= jwt.sign({_id:savedUser.id}, Jwt_secret)
                const {_id,name,email,username}= savedUser
                console.log(token);
                res.json({token, user: {_id,name,email,username} })
            }
            else{
                return res.status(422).json({error:"Invalid Password"})
            }
        }) .catch(err => console.log(err))
        
     })
     
})

module.exports = router;