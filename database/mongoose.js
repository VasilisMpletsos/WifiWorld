const mongoose = require('mongoose');

const connectionURL = 'mongodb://127.0.0.1:27017/wifi-plaza';

mongoose.connect(connectionURL,{
  useNewUrlPrser: true,
  useCreateIndex: true
})