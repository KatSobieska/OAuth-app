const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/logged", (req, res) => {
  if (req.user) {
    res.render("logged", {
      userName: req.user.displayName,
      photo: req.user.photos[0].value,
    });
  } else res.redirect("user/no-permission");
});

router.get("/profile", (req, res) => {
  if (req.user) {
    res.render("profile");
  } else res.redirect("user/no-permission");
});

router.get("/profile/settings", (req, res) => {
  if (req.user) {
    res.render("profileSettings");
  } else res.redirect("user/no-permission");
});

router.get("/no-permission", (req, res) => {
  res.render("noPermission");
});

router.get("/logout", (req, res) => {
  res.render("logout");
});

module.exports = router;
