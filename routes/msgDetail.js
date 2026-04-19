const { Router } = require("express");
const router = Router();
const messages = require("../db/messages");

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const msg = messages[id];
  res.render("msgDetail", { msg });
});

module.exports = router;
