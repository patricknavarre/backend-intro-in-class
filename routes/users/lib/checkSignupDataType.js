/********************************************************************************************
 * PULLING IN THE `VALIDATOR` LIBRARY. USING THE `MATCHES` AND `ISSTRONGPASSWORD METHODS *
 ********************************************************************************************/
const { matches, isStrongPassword } = require("validator");

/**************************************************************************************************
 * // PULLING IN THE checkForSymbol AND checkIsEmail FUNCTIONS THAT ARE IN OUR AUTHMETHODS.JS FILE *
 **************************************************************************************************/
const { checkForSymbol, checkIsEmail } = require("./authMethods");

/************************************************************************
 * HELPER FUNCTION THAT WILL CHECK IF THERE IS A NUMBER IN THE INPUT *
 ************************************************************************/
function checkIfHaveNumber(target) {
  if (matches(target, /[0-9]/g)) {
    return true;
  } else {
    return false;
  }
}
/***************************************************************************************
 * FUNCTION THAT IS CHECKING IF THE USER IS USING THE PROPER FORMATING WHEN SIGNING UP *
 ***************************************************************************************/
function checkSignupDataType(req, res, next) {
  let errorObj = {};

  const { firstName, lastName, email, password } = req.body;

  // if (matches(firstName, /[0-9]|[!@#$%^&*()\[\],.?":;{}|<>]/g)) {
  //   errorObj.firstName =
  //     "First Name cannot contains numbers and special characters";
  // }

  // if (matches(lastName, /[0-9]|[!@#$%^&*()\[\],.?":;{}|<>]/g)) {
  //   errorObj.lastName =
  //     "Last Name cannot contains numbers and special characters";
  // }
console.log(checkIfHaveNumber(firstName))
  if (checkIfHaveNumber(firstName)) {
    errorObj.firstName = "First Name cannot contains numbers";
  }

  if (checkIfHaveNumber(lastName)) {
    errorObj.lastName = "Last Name cannot contains numbers";
  }

  if (checkForSymbol(firstName)) {
    errorObj.firstName = "First Name cannot contains  special characters";
  }

  if (checkForSymbol(lastName)) {
    errorObj.lastName = "Last Name cannot contains  special characters";
  }
// UNCOMMENT THIS DURING PRODUCTION or FURTHER TESTING
  // if (!isStrongPassword(password)) {
  //   errorObj.password =
  //     "password must minimum 8 characters and must contain an uppercase, a lower case, a number and special character !@#$%^&*()<>{}";
  // }

  if (!checkIsEmail(email)) {
    errorObj.email = "Email must be in email format!";
  }

  if (Object.keys(errorObj).length > 0) {
    res.render("sign-up", { error: errorObj });

    // res.status(500).json({
    //   message: "Error",
    //   data: errorObj,
    // });
  } else {
    //It means go to the next function
    next();
  }
}

/**********************************************
 * EXPORT OUT checkSignupDataType FUNCTION *
 **********************************************/
module.exports = {
  checkSignupDataType,
};
