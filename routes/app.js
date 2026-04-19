const path = require("node:path");
const express = require("express");
const app = express();

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const indexRouter = require("./index");
const PORT = 3000;

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
