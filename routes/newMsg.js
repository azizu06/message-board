const { Router } = require("express");
const router = Router();
const msgs = require("../db/messages");

router.get("/", (req, res) => {
  res.render("form");
});

router.post("/", (req, res) => {
  const { author, message } = req.body;
  msgs.push({ text: message, user: author, added: new Date() });
  res.redirect("/");
});

module.exports = router;
