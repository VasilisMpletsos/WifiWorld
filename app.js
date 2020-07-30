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
    var capture = file.name;
    var buffer = file.data;
    var write = {mac,essid,password,location,capture};
  }else{
    var write = {mac,essid,password,location}
  }
  AccessPoint.find({mac: mac}).then((data)=>{
    if(data.length === 0){
      const wifi = new AccessPoint(write);
      wifi.save().then(()=>{
        if(capture){
            fs.writeFileSync(__dirname +'\\public\\captures\\'+ capture,buffer);
        }
        console.log(chalk.green.inverse('New Wifi Point Registered!'));
        res.status(201).send('Success!');
      })
    }else{
      AccessPoint.updateOne({mac},{essid, password, location}).then(()=>{
        if(capture){
            fs.writeFileSync(__dirname +'\\public\\captures\\'+ capture,buffer);
        }
        console.log(chalk.green.inverse('Wifi Point Updated!'));
        res.status(201).send('Success!');
    })
    }
  }).catch((error)=>{
    console.log(chalk.green.inverse('Something went wrong'));
  })
})

app.post('/search',(req,res)=>{
  AccessPoint.find(req.body).then((wifiPoints)=>{
    res.status(200).send(wifiPoints);
  })
  .catch((error)=>{res.status(500).send();});
})

app.get('',(req,res)=>{
  res.status(200).redirect('./html/index.html');
})

app.get('/hash/:file',(req,res)=>{
  res.status(200).download(`./public/captures/${req.params.file}`);
})
