const { Router } = require("express");
const router = Router();
const msgs = require("../db/messages");

router.get("/", (req, res) => {
  res.render("index", { messages: msgs });
});

module.exports = router;
