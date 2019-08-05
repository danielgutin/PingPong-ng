var express = require('express');
var router = express.Router();

// Login Controller.
const loginController = require('../../controllers/login');

// Home page route.
// check if user exists in DB, and login.
router.post('/', loginController.loginUser );

// create new user route.
router.post('/newuser', loginController.newUser );



//export the Login router ( contains all /login routes.)
module.exports = router;
