var express = require('express');
var app = express();
var mongoose = require('mongoose');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
const cors = require('cors');


// enable cors to the server
const corsOpt = {
  origin: '*', // this work well to configure origin url in the server
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'], // to works well with web app, OPTIONS is required
  allowedHeaders: ['Content-Type', 'Authorization', 'timezoneoffset', 'pragma', 'cache-control', 'content-type', 'ipaddress'], // allow json and token in the headers
  preflightContinue: true
};
app.use(cors(corsOpt)); // cors for all the routes of the application
app.options('*', cors(corsOpt)); // a


var uri = "mongodb+srv://Storage_9676:Storage_9676@tejaclustor.58yfl.mongodb.net/trianabot?retryWrites=true&w=majority";


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once('open', function () {
  console.log('Connection has been made!');
}).on('error', function (error) {
  console.log('Error is: ', error);
});

require('./routes')(app);

app.listen(9000, '0.0.0.0', function (err, result) {
  console.log("Server is started");
})

exports = module.exports = app;
