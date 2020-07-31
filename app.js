require('dotenv').config({path:__dirname+'/global.env'})

const express = require('express');
const validator = require('validator');
const chalk = require('chalk');
require('./database/mongoose.js')
const AccessPoint = require('./models/wifi');
const axios = require('axios');
const fileupload = require('express-fileupload');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const index = require('./public/html/index');
const port = 4444;

var capture = 'vasilis.txt';
console.log(__dirname +'\\public\\captures\\'+ capture);

app.use(express.static(__dirname + '/public'));
app.use(fileupload());
app.listen(port,()=>{
  console.log(`Server is listening to port ${port}`);
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Things to do:
// 1.Add the possibility to upload or download Capture file!

app.post('/add',(req,res)=>{
  var mac = req.body.mac;
  var password = req.body.password;
  var essid = req.body.essid;
  var location = req.body.location;
  if(req.files){
    var file = req.files.file;
    var fileType = file.name.split('.').pop();
    var capture = mac + '.' +fileType;
    var buffer = file.data;
    var write = {mac,essid,password,location,capture};
  }else{
    var write = {mac,essid,password,location}
  }
  AccessPoint.find({mac: mac}).then((data)=>{
    if(data.length === 0){
      const wifi = new AccessPoint(write);
      wifi.save().then(()=>{
        if(fileType ==='cap' | 'hccapx'){
            fs.writeFileSync(__dirname +'\\public\\captures\\'+capture,buffer);
        }
        console.log(chalk.green.inverse('New Wifi Point Registered!'));
      })
    }else{
      AccessPoint.updateOne({mac},write).then(()=>{
        if(fileType ==='cap' | 'hccapx'){
            fs.writeFileSync(__dirname +'\\public\\captures\\'+capture,buffer);
        }
        console.log(chalk.green.inverse('Wifi Point Updated!'));
    })
    }
    var info = {
      info: `<div class="row">
        <div class="success">
          Operation was Succesfull!
          </div>
        </div>
        `
    }
    res.status(200).send(index(info));
  }).catch((error)=>{
    console.log(chalk.green.inverse('Something went wrong'));
    console.log(error);
    var info = {
      info: `<div class="row">
        <div class="failure">
          Something wnt wrong!
          </div>
        </div>
        `
    }
    res.status(400).send(index(info));
  })
})

app.post('/search',(req,res)=>{
  AccessPoint.find(req.body).then((wifiPoints)=>{
    res.status(200).send(wifiPoints);
  })
  .catch((error)=>{res.status(500).send();});
})

app.get('',(req,res)=>{
  res.status(200).send(index({info: ''}));
})

app.get('/hash/:file',(req,res)=>{
  res.status(200).download(`./public/captures/${req.params.file}`);
})
