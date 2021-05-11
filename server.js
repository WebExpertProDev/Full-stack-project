const express = require('express');
const bodyParser = require('body-parser');
const ODM = require('mongoose');
const path = require('path');
const Strategy = require('./helpers/Authenticator');
const passport = require('passport');
const cors = require('cors')
const app = express();
const schedule =  require('node-schedule')
const {spawn} = require('child_process');

// ! ##### Middlewares #####
// ? -----------------------

// * Static files
// app.use(express.static(__dirname + 'public'));
// app.use(path.join(__dirname + 'public'));

const mls_install_dependencies = spawn('python', ['MLS-CREA/install_dependencies.py'] )

mls_install_dependencies.on('close', function (code1){

  console.log(`MLS python dependency script finished with code ${code1}`);
  if (code1 != 0){
    throw "MLS python dependency script failed"
  }

  const mls_init = spawn('python', ['MLS-CREA/main.py', 'init']);
    // collect data from script
  
  mls_init.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    console.log(data)
  });
  
  mls_init.on('close', (code) => {
    console.log(`MLS python init script finished with code ${code}`);
    if (code != 0){
      throw "MLS python script failed"
    }
  
    // schedule update task every midnight
    schedule.scheduleJob('0 0 * * *', () => { 
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate()- 1)
      console.log(1);
  
      // spawn new child process to call the python script
      const mls_update = spawn('python', ['MLS-CREA/main.py', 'update', yesterday.toISOString().slice(0, -5) + 'Z']);
      // collect data from script
  
      mls_update.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        console.log(data)
      });
      
      mls_update.on('close', (code2) => {
        console.log(`MLS python update script finished with code ${code2}`);
        if (code2 != 0){
          throw "MLS python script failed"
        }
      });
  })
  });

})



// * Serve all the files with /image in the url
// app.use('/thumbnail', express.static(__dirname + '/images'));
app.use('/images', express.static(path.join(__dirname + '/public')));

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

// enable cors requests for the following urls
let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);
const allowlist = [process.env.CLIENT_URL] // append to this array if you want to allow more url
const corsOptionsDelegate = function (req, callback) {
  var corsOptions; // please keep this as var
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }
  } else {
    corsOptions = { origin: false }
  }
  callback(null, corsOptions)
}

app.use(cors(corsOptionsDelegate))


// ? Routes files
const OTP = require('./routes/userRoutes/OTP');
const isLoggedIn = require('./routes/userRoutes/isLoggedIn');
const addListHome = require('./routes/homeRoutes/addHomeListing');
const getHomeListings = require('./routes/homeRoutes/getHomeListings');
const getHomeFilter = require('./routes/homeRoutes/getHomeFilter');
// const addSellListing = require('./routes/sellRoutes/addSellListing');
// const getSellListing = require('./routes/sellRoutes/getSellListings');
// const authenticateUser = require('./routes/userRoutes/authenticateUser');
// const uploadUserAvatar = require('./routes/fileUpload/getUserAvatar');
// const uploadContracts = require('./routes/fileUpload/getContracts');
// const uploadHomeImages = require('./routes/fileUpload/getHomeImages');
// const uploadSellImages = require('./routes/fileUpload/getSellImages');
const userPayment = require('./routes/userRoutes/payment');
const userCheckout = require('./routes/userRoutes/payment_session');
const addTour = require('./routes/tourRoutes/addTour');
const isOpen = require('./routes/tourRoutes/isOpen');
const signOut = require('./routes/userRoutes/signOut');
const addSellOffer = require('./routes/sellRoutes/addSellOffer');
const assignAgent = require('./routes/userRoutes/assignAgent');

// for fb or google only 
const fbsignin = require('./routes/userRoutes/external/signin');
const fbsignout = require('./routes/userRoutes/external/signout');
const fbsignup = require('./routes/userRoutes/external/signup');

// ? Admin Routes
const getUsersAdmin = require('./routes/ACL/getUsers');
//  find rent or selling by agent id
// const getSellListingbyagentID = require('./routes/sellRoutes/getSellListingsbyagentID');
const getHomeListingbyagentID = require('./routes/homeRoutes/getHomeListingsbyagentID');
const getHomeListingbyAddress = require('./routes/homeRoutes/getListingbyAddress');
const getHomeListingbyID = require('./routes/homeRoutes/getHomeListingbyID');
const getSimilarHomesbyID = require('./routes/homeRoutes/getSimilarHomesbyID');
const getNearbyHomesbyID = require('./routes/homeRoutes/getNearbyHomesbyID');
const incrementHomeView = require('./routes/homeRoutes/incrementHomeView');
const getMarketAvgPrice = require('./routes/homeRoutes/getMarketAvgPrice');
const { exception } = require('console');

// const getHomeFilter = require('./routes/homeRoutes/getHomeFilter');
// const getSellFilter = require('./routes/sellRoutes/getSellFilter');
app.use('/static', express.static('public'));

// ! ADMIN ROUTER MIDDLEWARE
app.use('/api/admin', getUsersAdmin);

// ? Router middleware
app.use('/api/user', isLoggedIn);
app.use('/api/user', signOut);
app.use('/api/user', assignAgent);
// app.use('/api/user', authenticateUser);
app.use('/api/sendCode', OTP);
app.use('/api', addListHome);
app.use('/api', getHomeListings);
// app.use('/api', addSellListing);
// app.use('/api', getSellListing);
// rent or sell by agent
/// Route for getting selllisting by agent id. gid is the agent id
// GET /api/getSellListings/:gid
// app.use('/api', getSellListingbyagentID);
/// Route for getting rentlisting by agent id. gid is the agent id
// GET /api/getHomeListings/:gid
app.use('/api', getHomeListingbyagentID);
app.use('/api', getHomeListingbyAddress);
app.use('/api', getHomeListingbyID);
app.use('/api', getNearbyHomesbyID);
app.use('/api', getSimilarHomesbyID);
app.use('/api', incrementHomeView);
app.use('/api', getHomeFilter);
app.use('/api', getMarketAvgPrice);

app.use('/api/externaluser', fbsignin);
app.use('/api/externaluser', fbsignout);
app.use('/api/externaluser', fbsignup);

// app.use('/api/userAvatar', uploadUserAvatar);
// app.use('/api/contracts', uploadContracts);
// app.use('/api/homeImages', uploadHomeImages);
// app.use('/api/sellImages', uploadSellImages);
app.use('/api/user/payment', userPayment);
app.use('/api/user/payment', userCheckout);
app.use('/api', addTour);
app.use('/api', isOpen);
app.use('/api', addSellOffer);

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