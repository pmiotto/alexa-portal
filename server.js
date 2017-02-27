
// var https = require('https');
// var fs = require('fs');

// var options = {
//     key: fs.readFileSync('/etc/apache2/ssl/server.key'),
//     cert: fs.readFileSync('/etc/apache2/ssl/server.crt'),
//     requestCert: false,
//     rejectUnauthorized: false
// };

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');
var clientController = require('./controllers/client');
var oauth2Controller = require('./controllers/oauth2');

var ejs = require('ejs');
var session = require('express-session');

var passport = require('passport');
var authController = require('./controllers/auth');

// Connect to the beerlocker MongoDB
// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/beerlocker');

// mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/alexaportal');

// Create our Express application
var app = express();

// Set view engine to ejs
app.set('view engine', 'ejs');

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use express session support since OAuth2orize requires it
app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /beers
router.route('/beers')
  .post(authController.isAuthenticated, beerController.postBeers)
  .get(authController.isAuthenticated, beerController.getBeers);

// Create endpoint handlers for /beers/:beer_id
router.route('/beers/:beer_id')
  .get(authController.isAuthenticated, beerController.getBeer)
  .put(authController.isAuthenticated, beerController.putBeer)
  .delete(authController.isAuthenticated, beerController.deleteBeer);

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

// Create endpoint handlers for /clients
router.route('/clients')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);

// Create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

router.route('/oauth2/authorize/finish')
  .get(authController.isAuthenticated, oauth2Controller.authorizationFinish);

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
  .post(authController.isClientAuthenticated, oauth2Controller.token);
  
// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(process.env.PORT || 3000);

// var server = https.createServer(options, app).listen(process.env.PORT || 3000, function(){
//     console.log("server started at port 3000");
// });