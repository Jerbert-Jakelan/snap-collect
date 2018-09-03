require("dotenv").config();

const express = require("express");
const { json } = require("body-parser");
const massive = require("massive");
const session = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("./strategy");

// controllers
const profileController = require("./controllers/profileController");
const colController = require("./controllers/collectionsController");
const cardController = require("./controllers/cardController");

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(Auth0Strategy);

massive(process.env.DB_CONNECTION)
  .then(db => {
    app.set("db", db);
    console.log("Database connected");
    app
      .get("db")
      .build_schema()
      .then(() => console.log("Schema built"))
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));

app.use(json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 //1 hour
    }
  })
);

// serialUser is what properties from the user we want back.
passport.serializeUser((user, done) => {
  console.log(user);
  console.log(user.displayName, user.user_id, user._json.picture);
  app
    .get("db")
    .auth0.getUserAuthId(user.user_id)
    .then(response => {
      if (!response[0]) {
        app
          .get("db")
          .auth0.addUserAuthId([
            user.displayName,
            user.user_id,
            user._json.picture
          ])
          .then(res => {
            return done(null, res[0]);
          })
          .catch(err => console.log(err));
      } else {
        return done(null, response[0]);
      }
    })
    .catch(err => console.log(err));
});

// logic to be done with this new version of user.
passport.deserializeUser((user, done) => {
  done(null, user);
});

// endpoints
app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: process.env.SUCCESS_REDIRECT,
    failureRedirect: process.env.FAILURE_REDIRECT
    // failureFlash: false
  })
);

app.get("/me", (req, res, next) => {
  if (!req.user) {
    res.redirect("/login");
  } else {
    res.status(200).send(req.user);
  }
});

//update profile
app.put("/api/profile/update", profileController.updateProfile);
app.get("/api/getProfile", profileController.getUser);

//collection endpoints
app.post("/api/collections", colController.addCollection);
app.get("/api/collections", colController.getCollections);
app.put("/api/collections/:id", colController.editCollection);
<<<<<<< HEAD
app.delete("/api/collections/:collection_id", colController.deleteCollection);
=======
app.get('/api/categories', colController.getCategories);
>>>>>>> master

//card endpoints
app.post("/api/cards", cardController.createCard);
app.get("/api/cards/:collection_id", cardController.getCards);
app.delete("/api/cards/:collection_id/:card_id", cardController.delCards);

// this server port. must match what we put in auth0
const port = 3001;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
