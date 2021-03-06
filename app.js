/****************************************************
 * // THE FILE IS THE BEGINNING OF THE ENTIRE APP / THE BRAIN** *
 ****************************************************/

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const MongoStore = require ("connect-mongo")(session);
const mongoose = require("mongoose");

// bring this file in and use it right away.  ALLOWS US TO USE THE ENVIRONMENT .env 
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO DB CONNECTED");
  })
  .catch((e) => {
    console.log(e);
  });

const indexRouter = require("./routes/index");
const usersRouter = require("./users/users");

// obstantiate a server
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// logging what type of request is being made
app.use(logger("dev"));
// if there's any json i want to be able to use 
app.use(express.json());
// be able to view encoded uRL
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// if there's any static such as images, stylesheets...serve it up in public
app.use(express.static(path.join(__dirname, "public")));

/********************************************************************************************************************
 * // MIDDLEWARE FOR THE COOKIE INFORMATION.  THE MAXAGE IS BASED OFF OF MILLISECONDS.  SO THE FOLLOWING IS FOR 1HR *
 ********************************************************************************************************************/
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // without the store: the DB will not save when the user leaves site.  
    store: new MongoStore({
      url: process.env.MONGODB_URI,
      mongooseConnection: mongoose.connection,
      autoReconnect: true,
    }),
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);

/******************************************************
 * // ASSIGN THE INTERNAL GLOBAL VARIABLES FOR EJS *
 ******************************************************/
app.use((req, res, next) => {
  res.locals.error = null;
  res.locals.success = null;
  res.locals.data = null;

  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
