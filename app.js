
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

mongoose.connect('mongodb://Malltopic:micasita123@ds030817.mongolab.com:30817/instrumentacion', function(err, res) {
//mongoose.connect('mongodb://localhost/GuiaDB', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database');
    console.log(res);
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var MUser     = require('./models/instru')(app, mongoose);
var UsersCtrl = require('./Controllers/Cinstru');



var router = express.Router();
router.get('/', function(req, res) {
  res.send("Api Rest With MongoDB running...");
});




router.use(function(req, res, next) {  
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(router);

// API routes
var usersr = express.Router();

//---------Inicio rutas Users--------------//
usersr.route('/user')
  .get(UsersCtrl.findAllUsers)
  .post(UsersCtrl.addUser);

usersr.route('/user/:id')
  .get(UsersCtrl.findUserById)
  .put(UsersCtrl.updateUser)
  .delete(UsersCtrl.deleteUser);
//----------Fin rutas Users-------------------//


app.use('/api', usersr);

var Port = process.env.PORT || 8888;
app.listen(Port, function() {
  console.log("Node server running on http://localhost:3000. Server  With MongoDB");
});