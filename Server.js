// require express and mongoose
const express = require('express');
const mongoose = require('mongoose');
// require the .env
require('dotenv').config()
const port  =5000;
//invoke express
 const app = express();

//  // connexion database mongo atlas with server
mongoose.connect(process.env.DB_HOST,{useUnifiedTopology: true , useNewUrlParser: true}, (err)=>{
    err ? console.log(err) : console.log("database was connected successfully");
})

// parse data to json object
app.use(express.json());
// import user schema from User.js
const user = require('./models/User');

// getting all users
app.get('/allUsers' ,async (req,res) => {
 try {
   const users = await user.find() // find all users and return them
   res.send(users); // show users
 } catch(err){
    res.status(500).json({message : err.message}) // error 
 }
})

// adding new user
app.post('/addUser' ,async (req,res) => {
    const newUser = new user({  // assign the new values from the req.body
        firstName: req.body.firstName, // assign the new values from the req.body
        lastName: req.body.lastName,// assign the new values from the req.body
        age: req.body.age,// assign the new values from the req.body
        email: req.body.email
        
    })
    try{
      const User = await newUser.save();  // save the new user added
      res.status(201).json(User) // msg success
    }catch(err){
        res.status(400).json({message : err.message}) //msg error
    } 
})

// updating user by id
app.put('/updateUser/:id' ,async (req,res) => {  
    const {firstName,lastName}=req.body;  // destructuring elemets from req.body 
    try{
        const updatedUser = await user.findById(req.params.id); // getting user to update
          updatedUser.firstName = firstName; //assign the new value to firstName
          updatedUser.lastName = lastName;    //assign the new value to lasstName
          const us =await  updatedUser.save();    // save modification and return the updated user
        res.status(201).json(us);  // message success 
    }catch(err){
        res.status(500).json({message : err.message}) // error
    }
})

// deleting user 
app.delete('/deleteUser/:id' , async (req,res) => { 
    try{
        const removeUser = await user.findById(req.params.id); // getting user to delete it
        removeUser.remove(); // delete user
        res.json({message :'user deleted !'})
    }catch(err){
        res.status(500).json({message : err.message})
    }
   
})
// server running on port 
 app.listen(port ,(err) =>{
     err ? console.log(err) : console.log('running server on port ' + port)
 });
