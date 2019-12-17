var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const userRouter = require("./routes/getUsersRouter");
const apiRouter = require("./routes/authRoutes");
const createIngrRouter = require("./routes/IngredientRouter");
const createRecipeRouter = require("./routes/RecipeRouter");
const createDayPlanRouter = require("./routes/DayPlanRouter");
const createWeekPlanRouter = require("./routes/WeekPlanRouter");
const imageRouter = require("./routes/imageUploadRouter");
require("dotenv").config();

var app = express();

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect("mongodb://localhost:27017/myapp", { useNewUrlParser: true })
  .then(() => {
    console.log("mongo connected");
  })
  .catch(err => {
    console.log("mongoose error" + err);
  });

// setup sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
// setup cors
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3000/",
      "https://localhost:3000"
    ],
    credentials: true
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", apiRouter);
app.use("/user", userRouter);
app.use("/ingredient", createIngrRouter);
app.use("/recipe", createRecipeRouter);
app.use("/dayplan", createDayPlanRouter);
app.use("/weekplan", createWeekPlanRouter);
app.use("/upload", imageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json("error");
});

module.exports = app;
