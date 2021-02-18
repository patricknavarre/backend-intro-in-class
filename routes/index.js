/*********************************************************************
 * THIS IS WHERE WE TELL THE APPLICATION THAT WE'RE USING EXPRESS *
 *********************************************************************/
var express = require('express');
var router = express.Router();

/*********************
 * GET / HOME PAGE. *
 *********************/
router.get('/', function(req, res, next) {

  console.log(req.session)
   res.send("this is the default page");
  // res.render('index', { title: 'Express' });
});

module.exports = router;
