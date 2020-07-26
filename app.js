const express = require('express');
const validator = require('validator');
const chalk = require('chalk');
require('./database/mongoose.js')
const AccessPoint = require('./models/wifi');

const app = express();
const port = 4444;

app.use(express.static(__dirname + '/public'));

app.use(express.json());

app.listen(port,()=>{
  console.log(`Server is listening to port ${port}`);
});

app.post('/add',(req,res)=>{
  const wifi = new AccessPoint(req.body);
  wifi.save().then(()=>{
    console.log(chalk.green.inverse('New Wifi Point Registered!'))
    res.status(201).send('Done!');
  }).catch((error)=>{
    console.log(chalk.red.inverse('Something has gone wrong on inserting the wifi data!'));
    res.status(400).send('Error!');
  })
})

app.post('/search',(req,res)=>{
  AccessPoint.find(req.body).then((wifiPoints)=>{
    res.status(200).send(wifiPoints);
  })
  .catch((error)=>{res.status(500).send();});
})

app.get('',(req,res)=>{
  res.redirect('html/index.html');
})
