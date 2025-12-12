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
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Error fetching products");
    }
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { title, author, description, price, images, quantity, currency } = req.body;
  const query = `
    INSERT INTO products (title, author, description, price, images, quantity, currency)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [title, author, description, price, images, quantity, currency], (err, result) => {
    if (err) {
      return res.status(500).send("Error adding product");
    }
    res.status(201).json({ id: result.insertId, ...req.body });
  });
});

router.delete("/:productID", (req, res) => {
  const { productID } = req.params;
  const query = "DELETE FROM products WHERE productID = ?";
  db.query(query, [productID], (err) => {
    if (err) {
      return res.status(500).send("Error deleting product");
    }
    res.status(204).send();
  });
});

module.exports = router;
