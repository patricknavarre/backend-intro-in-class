/*********************************************************************
 * UTILIZING THE `VALIDATOR` LIBRARY AND REQUIRING IT INTO THE FILE *
 *********************************************************************/
const { matches, isEmpty, isEmail } = require("validator");

/*************************************************************************************
 * MAKING A FUNCTION THAT WILL CHECK IF THE USER IS INPUTING AN ILLEGAL CHARACTER *
 *************************************************************************************/
function checkForSymbol(target) {
  if (matches(target, /[!@#$%^&*()\[\],.?":;{}|<>]/g)) {
    return true;
  } else {
    return false;
  }
}
/**************************************************************************************
 * MAKING A FUNCTION THAT WILL CHECK IF THE USER IS LEAVING THE INPUT FIELDS EMPTY *
 **************************************************************************************/
function checkIsEmpty(target) {
  if (isEmpty(target)) {
    return true;
  } else {
    return false;
  }
}
/************************************************************************************************
 * MAKING A FUNCTION THAT WILL CHECK TO SEE IF THE EMAIL THATS INPUT IS IN THE PROPER FORMAT *
 ************************************************************************************************/
function checkIsEmail(target) {
  if (isEmail(target)) {
    return true;
  } else {
    return false;
  }
}
/***************************************************************************************************
 * EXPORT THE FUNCTIONS USING MODULE.EXPORTS.  MULTIPLES NEED TO BE IN AN OBJECT/CURLY BRACKETS *
 ***************************************************************************************************/
module.exports = {
  checkForSymbol,
  checkIsEmpty,
  checkIsEmail,
};
