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
// const { send_contribution } = require("./controllers/send_contribution");
// const { verify_contribution } = require("./controllers/verify_contribution");
// const { add_new_post } = require("./controllers/add_new_post");
// const { get_contributions } = require("./controllers/get_contributions");
// const { get_posts } = require("./controllers/get_posts");
// const { handle_favorite } = require("./controllers/handle_favorite");
// const { upgrade_premium } = require("./controllers/upgrade_premium");
// const { update_post } = require("./controllers/update_post");
// const { delete_post } = require("./controllers/delete_post");
// const { get_user } = require("./controllers/get_user");
// const { scrape_data } = require("./controllers/scrape");
// const {
//   accept_discard_contribution,
// } = require("./controllers/accept_discard_contribution");
// const {
//   get_user_contributions,
// } = require("./controllers/get_user_contributions");

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
