const express = require('express');
const mongoose = require('mongoose');

// create schema 
const Schema = mongoose.Schema;  // create instance 
const userSchema = new Schema ({
  firstName :{
      type :String,
      required :true,  // name required 
  },
  lastName :{
    type :String,
    required :true,  // name required 
},
     age :Number,
     email:String
})
// export schema
module.exports = mongoose.model('user',userSchema);