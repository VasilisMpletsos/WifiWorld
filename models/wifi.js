const mongoose = require('mongoose');
const validator = require('validator');

const AccessPoint = mongoose.model('AccessPoints',{
  mac: {
    type: String,
    unique: true,
    required: true,
    validate(value){
      if(!validator.isMACAddress(value)){
        throw new Error('Not a MAC address!');
      }
    }
  },
  essid: {
    type: String,
    required: true
  },
  password:{
    type: String,
    trim: true
  },
  location:{
    type: String
  },
  capture:{
    type: String
  }
})

module.exports = AccessPoint;
