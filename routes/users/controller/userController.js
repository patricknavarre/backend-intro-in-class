/*************************************************************
 * `BCRYPT` IS A LIBRARY THAT WILL MAKE `HASHED` PASSWORDS *
 *************************************************************/
const bcrypt = require("bcryptjs");
/*****************************************************************************************
 * // THIS IS WHERE THE MONGOOSE SCHEMA USER TEMPLATE IS BEING PULLED FROM USING REQUIRE *
 *****************************************************************************************/
const User = require("../model/User");


/************************************************************************
 * ALL THE FUNCTIONS BUILT HERE ARE NESTED INSIDE THE MODULE.EXPORTS *
 ************************************************************************/
module.exports = {
/*****************************************************************
 * MAKING A FUNCTION THAT WILL FIND ALL USERS IN THE DATABASE *
 *****************************************************************/
  getAllUsers: async (req, res) => {
    try {
      const foundAllUsers = await User.find({});

      res.status(200).json({
        message: "success",
        users: foundAllUsers,
      });
    } catch (error) {
      res.status(500).json({
        message: "failure",
        errorMessage: error.message,
      });
    }
  },
/****************************************************
 * MAKING A FUNCTION THAT WILL SIGNUP NEW USERS. *
 ****************************************************/
  signup: async (req, res) => {
    //destructuring
    const { firstName, lastName, email, password } = req.body;
    try {
      const salted = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salted);
/**********************************************************************************
 * CREATING A NEW USER W/ FIRSTNAME, LASTNAME, EMAIL, AND PASSWORD PROPERTIES. *
 * USING .TRIM() TO MAKE SURE THE USER DOESN'T ADD EXTRA SPACES ON THE END *
 **********************************************************************************/
      const createdUser = new User({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password: hashedPassword,
      });

      let savedUser = await createdUser.save();

      res.render("sign-up", { success: true});
      // res.status(200).json({
      //   message: "success",
      //   user: savedUser,
      // });
    } catch (error) {
      res.status(500).json({
        message: "error",
        errorMessage: error.message,
      });
    }
  },
/*********************************************
 * FUNCTION THAT WILL DELETE A USER BY ID *
 *********************************************/
  deleteUserByID: async (req, res) => {
    try {
      let deletedUser = await User.findByIdAndDelete({ _id: req.params.id });

      res.status(200).json({
        message: "successfully deleted",
        deletedUser: deletedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "error",
        errorMessage: error.message,
      });
    }
  },
/************************************************
 * FUNCTION THAT WILL DELETE A USER BY EMAIL *
 ************************************************/
  deleteUserByEmail: async (req, res) => {
    try {
      let deletedUser = await User.findOneAndDelete({ email: req.body.email });

      res.status(200).json({
        message: "successfully deleted",
        deletedUser: deletedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "error",
        errorMessage: error.message,
      });
    }
  },
/****************************************
 * FUNCTION THAT WILL UPDATE A USER BY ID *
 ****************************************/
  updateUserByID: async (req, res) => {
    try {
      let updatedUser = await User.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );

      res.status(200).json({
        message: "successfully updated",
        updatedUser: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "error",
        errorMessage: error.message,
      });
    }
  },
/**********************************************
 * FUNCTION THAT WILL UPDATE USER BY EMAIL *
 **********************************************/
  updateUserByEmail: async (req, res) => {
    try {
      let updatedUser = await User.findOneAndUpdate(
        { email: req.body.email },
        req.body,
        { new: true }
      );
      res.status(200).json({
        message: "successfully updated",
        updatedUser: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "error",
        errorMessage: error.message,
      });
    }
  },
/*********************
 * // LOGIN FUNCTION *
 *********************/
  login: async (req, res) => {
    try {
      let foundUser = await User.findOne({ email: req.body.email });

      if (!foundUser) {
        res.render("login", { error: {
         message: "Sorry, user does not exist. Plese go signup"
        },
        });
        // res.status(404).json({
        //   message: "Sorry, user does not exist.  Please go signup!",
        // });
      } else {
        let isPasswordTrue = await bcrypt.compare(
          req.body.password,
          foundUser.password
        );

        if (isPasswordTrue) {
          req.session.user = {
            _id: foundUser._id,
            email: foundUser.email,
          };
          // print out the `cookie` session info 
          console.log(req.session);
          res.render("home", { user: foundUser.email });
          // res.json({
          //   message: "success",
          //   successMessage: "Logged In!",
          // });
        } else {
          res.status(500).json({
            message: "failure",
            successMessage: "please check your email and password",
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        message: "error",
        errorMessage: error.message,
      });
    }

    //step 1 find the user e.g email
    //step 2 if the user doesnt exists tell
    //send a message back saying 'User not found go
    //go sign up
    //step 3 if the user is found
    //compare the password
    //if the password does not match
    //send a message back saying
    //check your email and password
    //if passord matches
    //send a message back saying
    //successfully logged In
  },
};
