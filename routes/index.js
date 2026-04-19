const { Router } = require("express");
const router = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

router.get("/", (req, res) => {
  res.render("index", { messages });
});

router.get("/new", (req, res) => {
  res.render("form");
});

router.post("/new", (req, res) => {
  const { author, message } = req.body;
  messages.push({ text: message, user: author, added: new Date() });
  res.redirect("/");
});

router.get("/msgs/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 0 || id >= messages.length)
    return res.status(404).send("Message not found");
  const msg = messages[id];
  res.render("msgDetail", { msg });
});

module.exports = router;
