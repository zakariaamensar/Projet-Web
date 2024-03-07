const express = require("express");
const express_session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

//variables and constants
const app = express();
const dbURI = "mongodb://localhost:27017/WebModerneDB";

//middleware
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3001"],
    methods: ["POST", "PATCH", "GET", "DELETE"],
    credentials: true,
  })
);

app.use(
  express_session({
    secret: "LOLSECRET",
    resave: false,
    saveUninitialized: true,
  })
);

// Passport Setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Controllers
const { register } = require("./controllers/register");
const { login } = require("./controllers/login");
const { isLoggedIn } = require("./utils/isLoggedIn");


// Routes
app.post("/register", register);
app.post("/login", login);
app.get("/isLoggedIn", isLoggedIn, (req, res) => {
  res.send(true);
});
app.get("/getUser", (req, res) => {
  console.log(req.isAuthenticated());
  res.send(req.user);
});

//MongoDB Connection
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected to local MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to local MongoDB:", err);
  });

//Server Spinning
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
