var express = require('express');
var app = express();
var http = require('http').Server(app);
var swig = require('swig');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

mongoose.connect('mongodb://mongo.storage.local');

var userSchema = mongoose.Schema({
  name: String
});

var User = mongoose.model('user', userSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res){
  res.redirect("/users");
});

app.get("/users", function(req, res){
  User.find({}, function(err, users) {
    res.send(
      swig.renderFile('./templates/index.swig', {
        users: users
      })
    );
  });
});

app.get("/user/add", function(req, res){
  res.send(
    swig.renderFile('./templates/user.swig', {
      user: {}
    })
  );
});

app.get("/user/:id/edit", function(req, res){
  User.find({_id: req.params.id}, function(err, users) {
    if (err) {
      res.send(err);
    } else {
      res.send(
        swig.renderFile('./templates/user.swig', {
          user: {
            id: users[0].id,
            name: users[0].name
          }
        })
      );
    }
  });
});

app.post("/user", function(req, res){
  var user = new User({name: req.body.name});
  user.save();
  res.redirect("/users");
});

app.post("/user/:id", function(req, res){
  var user = User.find({_id: req.params.id}, function(err, users){
    console.log(users);
    if(err){
      res.send(err);
    } else {
      users[0].name = req.body.name;
      users[0].save();
      res.redirect('/users');
    }
  });
});

http.listen(8080, function(){ console.log("ready!")});

