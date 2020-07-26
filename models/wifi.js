const mongoose = require('mongoose');
const validator = require('validator');

const AccessPoint = mongoose.model('AccessPoints',{
  mac: {
    type: String,
    required: true,
    unique: true,
    validate(value){
      if(!validator.isMACAddress(value)){
        throw new Error('Not a MAC address!');
      }
    }
  },
  bssid: {
    type: String,
    required: true
  },
  hash:{
    type: String,
    trim: true
  },
  password:{
    type: String,
    trim: true
  },
  location:{
    //Maybe i could make location with coordinates
    type: String
  }
})

module.exports = AccessPoint;
