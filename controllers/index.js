const db = require("../db/queries");

exports.getMsgs = async (req, res) => {
  const messages = await db.getAll();
  res.render("index", { messages });
};

exports.createMsgGet = (req, res) => {
  res.render("form");
};

exports.createMsgPost = async (req, res) => {
  const { author, message } = req.body;
  await db.insertMsg(message, author);
  res.redirect("/");
};

exports.getMsgDetail = async (req, res) => {
  const id = Number(req.params.id);
  const rows = db.msgCnt();
  if (!Number.isInteger(id) || id < 0 || id >= rows) {
    return res.status(404).send("Message not found");
  }
  const msg = db.findMsg(id);
  res.render("msgDetail", { msg });
};
