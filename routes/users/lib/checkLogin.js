/******************************************************
 * PULL IN THE .AUTHMETHODS.JS FILE USING REQUIRE.  *
 ******************************************************/
const { checkIsEmpty, checkIsEmail } = require("./authMethods.js");

// this function is to make sure the  user is inputting something in the email and password
// it also checks to make sure the email is in proper format
function checkLoginEmptyMiddleware(req, res, next) {
  let errorObj = {};

  let checkedEmail = false;


/***********************************************************
 * OBJECT DESTRUCTURING / EXTRACTING EMAIL AND PASSWORD *
 ***********************************************************/
  const { email, password } = req.body;

  if (checkIsEmpty(email)) {
    errorObj.email = "Email cannot be empty";
    checkedEmail = true;
  }

  if (checkIsEmpty(password)) {
    errorObj.password = "Password cannot be empty";
  }

  if (!checkedEmail) {
    if (!checkIsEmail(email)) {
      errorObj.email = "It must be in email format!";
    }
  }

  if (Object.keys(errorObj).length > 0) {
    res.render("login", { error: errorObj })
    // res.status(500).json({
    //   message: "Error",
    //   data: errorObj,
    // });
  } else {
/******************************************
 * NEXT() MEANS GO TO THE NEXT FUNCTION *
 ******************************************/
    next();
  }
}

function checkEmailFormat(req, res, next) {
  next();
  // let errorObj = {};
  // const { email } = req.body;
  // if (!checkIsEmail(email)) {
  //   errorObj.email = "It must be in email format!";
  // }

  // if (Object.keys(errorObj).length > 0) {
  //   res.status(500).json({
  //     message: "Error",
  //     data: errorObj,
  //   });
  // } else {
  //   //It means go to the next function
  //   next();
  // }
}

// module.exports is how we will actually send these functions out of this .js file.  
// Hence the word `exports` :)
module.exports = {
  checkLoginEmptyMiddleware,
  checkEmailFormat,
};
