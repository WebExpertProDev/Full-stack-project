const express = require('express');
const bodyParser = require('body-parser');
const ODM = require('mongoose');
const path = require('path');
const Strategy = require('./helpers/Authenticator');
const passport = require('passport');
const app = express();

// ! ##### Middlewares #####
// ? -----------------------

// * Static files
// app.use(express.static(__dirname + 'public'));
// app.use(path.join(__dirname + 'public'));

// * Serve all the files with /image in the url
// app.use('/thumbnail', express.static(__dirname + '/images'));
app.use('/thumbnail', express.static(path.join(__dirname + './public/images')));

// * dotenv middleware
require('dotenv').config();

// * BodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// * Passport
// require('./helpers/Authenticator')(passport);
const initializer = new Strategy();
initializer.init(passport);
app.use(passport.initialize());
app.use(passport.session());

// ? Routes files
const OTP = require('./routes/userRoutes/OTP');
const addListRent = require('./routes/rentRoutes/addRentListing');
const getRentListings = require('./routes/rentRoutes/getRentListings');
const addSellListing = require('./routes/sellRoutes/addSellListing');
const getSellListing = require('./routes/sellRoutes/getSellListings');
const authenticateUser = require('./routes/userRoutes/authenticateUser');
const uploadUserAvatar = require('./routes/fileUpload/getUserAvatar');
const uploadContracts = require('./routes/fileUpload/getContracts');
const uploadRentImages = require('./routes/fileUpload/getRentImages');
const uploadSellImages = require('./routes/fileUpload/getSellImages');
const userPayment = require('./routes/userRoutes/payment');
const RegisterAgent = require('./routes/agentRoutes/registerAgent');

// ? Admin Routes
const getUsersAdmin = require('./routes/ACL/getUsers');

// ! ADMIN ROUTER MIDDLEWARE
app.use('/api/admin', getUsersAdmin);

// ? Router middleware
app.use('/api/sendCode', OTP);
app.use('/api/user', authenticateUser);
app.use('/api', addListRent);
app.use('/api', getRentListings);
app.use('/api', addSellListing);
app.use('/api', getSellListing);
app.use('/api/userAvatar', uploadUserAvatar);
app.use('/api/contracts', uploadContracts);
app.use('/api/rentImages', uploadRentImages);
app.use('/api/sellImages', uploadSellImages);
app.use('/api/user/payment', userPayment);
app.use('/api/agent', RegisterAgent);
// ! ##### Server #####
// ? -----------------------

app.listen(process.env.APP_PORT, () => {
  ODM.set('useNewUrlParser', true);
  ODM.set('useFindAndModify', false);
  ODM.set('useCreateIndex', true);
  ODM.set('useUnifiedTopology', true);
  ODM.connect(process.env.MONGODB_URI);

  console.log(`\n\x1b[1m\x1b[33m## SERVER STRATED ON PORT:\x1b[0m\x1b[1m \x1b[32m${process.env.APP_PORT} ## \x1b[0m`);
 
  console.log(`\x1b[1m\x1b[33m## ADDRESS:\x1b[0m\x1b[1m \x1b[32m${process.env.URL} ## \x1b[0m \n`);

  ODM.connection.on('error', error => {
    console.log(`\x1b[41m\x1b[1mODM error\x1b[0m`, error);    
  });

  console.log(`\x1b[34m\x1b[1mconnection to ODM...\x1b[0m`);
  ODM.connection.on('connected', () => {
    console.log(`\x1b[34m\x1b[1msuccessfully connected to ODM!\x1b[0m`);
  });

});