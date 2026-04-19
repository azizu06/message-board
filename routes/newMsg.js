const { Router } = require("express");
const router = Router();
const msgs = require("../db/messages");

router.get("/", (req, res) => {
  res.render("form");
});

router.post("/", (req, res) => {
  const { author, msg } = req.body;
  msgs.push({ text: msg, user: author, added: new Date() });
  res.redirect("/");
});

module.exports = router;
