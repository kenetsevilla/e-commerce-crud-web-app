const express = require("express");
const mysql = require("mysql2");
const router = express.Router();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});



router.get("/", (req, res) => {
  const query = "SELECT * FROM orders";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Error fetching orders");
    }
    res.json(results);
  });
});

module.exports = router;
