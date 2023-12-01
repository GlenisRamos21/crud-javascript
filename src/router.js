const express = require("express");
const router = express.Router();
const conexion = require("./database/db");

router.get("/", (req, res) => {
  conexion.query("SELECT * FROM users", (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render("index.ejs", { results: results });
    }
  });
});

router.post("/save", (req, res) => {
  const user = req.body.user;
  const rol = req.body.rol;

  conexion.query(
    "INSERT INTO users SET ?",
    { user: user, rol: rol },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/");
      }
    }
  );
});

router.post("/update", (req, res) => {
  const id = req.body.id;
  const user = req.body.user;
  const rol = req.body.rol;
  conexion.query(
    "UPDATE users SET ? WHERE id = ?",
    [{ user: user, rol: rol }, id],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/");
      }
    }
  );
});

router.get("/create", (req, res) => {
  res.render("create");
});

router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  conexion.query("SELECT * FROM users WHERE id=?", [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render("edit.ejs", { user: results[0] });
    }
  });
});

router.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  conexion.query("DELETE FROM users WHERE id = ?", [id], (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect("/");
    }
  });
});


module.exports = router;
