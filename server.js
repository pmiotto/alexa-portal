var https = require('https');
var fs = require('fs');

var express = require('express');
var bodyParser = require('body-parser');
var userController = require('./controllers/user');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var router = express.Router();

router.route('/authorize')
  .get(userController.getAuthorize);


app.use('/api', router);


var options = {};
if(!process.env.NODE_ENV) {
  options = {
      key: fs.readFileSync('/etc/apache2/ssl/server.key'),
      cert: fs.readFileSync('/etc/apache2/ssl/server.crt'),
      requestCert: false,
      rejectUnauthorized: false
  };
}

var server = https.createServer(options, app).listen(process.env.PORT || 3000, function(){
    console.log("server started ");
});