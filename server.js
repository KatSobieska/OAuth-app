const express = require("express");
const cors = require("cors");
const path = require("path");
const hbs = require("express-handlebars");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const { serialize, deserialize } = require("v8");

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "645557065021-ij7dqn7iqnrmb8vq2gi9t4jdpdsg479r.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, serialize) => {
  serialize(null, user);
});
passport.deserializeUser((obj, deserialize) => {
  deserialize(null, obj);
});

app.engine(
  "hbs",
  hbs({ extname: "hbs", layoutsDir: "./layouts", defaultLayout: "main" })
);
app.set("view engine", ".hbs");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(session({ secret: "anything" }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/user/logged", (req, res) => {
  res.render("logged");
});

app.get("/user/no-permission", (req, res) => {
  res.render("noPermission");
});

app.use("/", (req, res) => {
  res.status(404).render("notFound");
});

app.listen("8000", () => {
  console.log("Server is running on port: 8000");
});
