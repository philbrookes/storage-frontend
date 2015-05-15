var express = require('express');
var app = express();
var http = require('http').Server(app);
var swig = require('swig');
var bodyParser = require('body-parser')

//mongoose.connect('mongodb://172.30.17.249');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res){
  res.send(
    swig.renderFile('./templates/index.swig', {
      name: "phil"
    })
  );
});

app.get("/user", function(req, res){
  res.send(
    swig.renderFile('./templates/user.swig', {
      user: {}
    })
  );
});

app.get("/user/:id", function(req, res){
  res.send(
    swig.renderFile('./templates/user.swig', {
      user: {
        id: req.params.id,
        name: "phil"
      }
    })
  );
});

app.post("/user", function(req, res){
  res.send(req.body);
});

app.post("/user/:id", function(req, res){
  res.send(req.body.name);
});

http.listen(8080, function(){ console.log("ready!")});

