const express = require("express");
const path = require("path");
const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", require("./router"));

app.listen(3000, () => {
  console.log("SERVER corriendo en http://localhost:3000");
});
