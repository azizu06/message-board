const pool = require("./pool");

exports.getAll = async () => {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
};

exports.insertMsg = async (text, user) => {
  await pool.query("INSERT INTO messages(text,username) VALUES($1,$2)", [
    text,
    user,
  ]);
};

exports.findMsg = async (id) => {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
    id,
  ]);
  return rows[0];
};

exports.msgCnt = async () => {
  const { rows } = await pool.query("SELECT COUNT(*) FROM messages");
  return Number(rows[0].count);
};
