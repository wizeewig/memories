// const http = require('http');

// const server = http.createServer ((req,res)=>{
//     console.log("server created");
//     res.end("working");
// })

// server.listen(5000,"localhost",()=>{
//     console.log("server is running on 5000");
// })

const express = require("express");
const app = express()
const PORT = process.env.port || 5000;
const cors = require("cors");
const mongoose = require('mongoose');
const {mongoUrl} = require('./keys')
const path = require('path')

app.use(cors(
    {
        origin: ['https://memories-7fhn.onrender.com']
    }
))
app.use(express.json())
require('./models/model')
require('./models/post')
app.use(require('./routes/createPost'))
app.use(require('./routes/auth'))
app.use(require('./routes/user'))
mongoose.connect(mongoUrl)

mongoose.connection.on("connected", ()=>{
    console.log("Successfully connected to mongo");
})
mongoose.connection.on("error", ()=>{
    console.log("Not connected to mongo");
})

//serving the frontend
app.use(express.static(path.join(__dirname, "frontend/build")))

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname, "frontend",'build','index.html')),
    function(err){
        res.status(500).send(err)
    }
})

app.listen(PORT, ()=>{
    console.log("Server is running on " + PORT);
})