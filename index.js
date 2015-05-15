var express = require('express');
var app = express();
var http = require('http').Server(app);
var swig = require('swig');


app.get("/", function(req, res){
  res.send(
    swig.renderFile('./templates/index.swig', {
      name: "phil"
    })
  );
});

//app.use(express.static('public'));

http.listen(8080, function(){ console.log("ready!")});

//mongoose.connect('mongodb://172.30.17.249');
