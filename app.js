/****************************************************
 * // THE FILE IS THE BEGINNING OF THE ENTIRE APP** *
 ****************************************************/

const createError = require("http-errors");

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const session = require("express-session");
const MongoStore = require ("connect-mongo")(session);
const mongoose = require("mongoose");

// bring this file in and use it right away
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
const usersRouter = require("./routes/users/users");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/********************************************************************************************************************
 * // MIDDLEWARE FOR THE COOKIE INFORMATION.  THE MAXAGE IS BASED OFF OF MILLISECONDS.  SO THE FOLLOWING IS FOR 1HR *
 ********************************************************************************************************************/
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      url: process.env.MONGODB_URI,
      mongooseConnection: mongoose.connection,
      autoReconnect: true,
    }),
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);

/******************************************************
 * // ASSIGN THE INTERNAL GLOBAL VARIABLES FOR ERRORS *
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
