
const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const mongoose = require('mongoose');

require("./User");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname })
});

const User = mongoose.model("User");
const url = "mongodb+srv://name:Password@cluster0.4uzx0.mongodb.net/dbname?retryWrites=true&w=majority";
mongoose.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database connected");
   
  });

app.post('/send',(req,res)=>
{
    var myData = new User(req.body);
    User.find({email : myData.email}, function (err, docs) {
      if (docs.length){
        return res.status(409).send({message: 'Email is already taken.'})
      }
      else{
        myData.save()
        .then(item => {
          res.status(200).send({message: "user created"});
        })
        .catch(err => {
          res.status(400).send({message: "unable to save to database"});
        });
      }

    });
});
app.post('/getUser',(req,res)=>
{
    var myData = new User(req.body);
    User.find({email : myData.email,password : myData.password}, function (err, docs) {
      if (docs.length){
        return res.status(200).send(docs[0])
      }
      else{
        return res.status(400).send({message: 'Bad request'})
      }

    });
});

app.listen(3000,()=>{
    console.log("Server is running...");
});