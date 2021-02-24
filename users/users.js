/********************************************************************************
 * THIS FILE IS WHERE ALL THE INPUT / OUTPUT (CRUD) OF OUR APPLICATION IS HAPPENING *
 ********************************************************************************/
var express = require("express");
var router = express.Router();
var axios = require("axios");
// const bcrypt = require("bcryptjs");
// const User = require("./model/User");
const {
  getAllUsers,
  signup,
  login,
  deleteUserByEmail,
  deleteUserByID,
  updateUserByID,
  updateUserByEmail,
} = require("./controller/userController");

const { checkSignupInputIsEmpty } = require("./lib/checkSignup");
const { checkSignupDataType } = require("./lib/checkSignupDataType");
const {
  checkLoginEmptyMiddleware,
  checkEmailFormat,
} = require("./lib/checkLogin");
/* GET users listing. */
router.get("/create-user", function (req, res) {
  if (req.session.user) {
    res.redirect("/users/home");
  } else {
    res.render("sign-up");
  }
});

router.get("/login", function (req, res) {
  if (req.session.user) {
    res.redirect("/users/home");
  } else {
    res.render("login");
  }
})

router.get("/home", async function (req, res) {
  // try {
  //   let result = await axios.get(
  //     `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=hamster`
  //   );
  // res.json(result.data);
  // // console.log(result.data);
  // } catch (e) {
  //   res.status(500).json({
  //     message: "failure",
  //     data: e.message,
  //   });

  // }

  if(req.session.user) {
    res.render("home", { user: req.session.user.email });
  }else {
    res.render("message", { error: true});
  }
});

/*************************************************
 * // THIS IS WHERE THE API IS BEING PULLED FROM  - AXIOS IS DOING THE HTTP requests(GET,POST,PUT,DELETE)*
 *************************************************/
router.post("/home", async function (req, res) {
  if (req.session.user) {
    try {
      let result = await axios.get(
        // `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${req.body.search}`
        `https://api.openweathermap.org/data/2.5/weather?q={chicago}&appid=${process.env.GIPHY_API_KEY}&q=${req.body.search}`
      );
      console.log(result.data);
      res.render("home", { data: result.data, user: req.session.user.email });
    } catch (e) {
      res.status(500).json({
        message: "failure",
        data: e.message,
      });
    }
  } else {
    res.render("message", { error: true });
  }
});



router.get("/get-all-users", getAllUsers);

//v4 async and await
router.post(
  "/create-user",
  checkSignupInputIsEmpty,
  checkSignupDataType,
  signup
);

//login
router.post("/login", checkLoginEmptyMiddleware, checkEmailFormat, login);

//delete user by id
router.delete("/delete-user-by-id/:id", deleteUserByID);

//delete user by email
router.delete("/delete-user-by-email", deleteUserByEmail);

//update user by id
router.put("/update-user-by-id/:id", updateUserByID);

//update user by email
// router.put("/update-user-by-email/:email", userController.updateUserByEmail);
router.put("/update-user-by-email/", updateUserByEmail);

// logout
router.get("/logout", function(req, res) {
  req.session.destroy();

  res.clearCookie("connect.sid", {
    path: "/",
    httpOnly: true,
    secure: false,
    maxAge: null,
  });

  res.redirect('/users/login');
});

module.exports = router;
