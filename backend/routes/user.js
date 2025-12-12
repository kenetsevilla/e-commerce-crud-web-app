const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

router.post("/register", (req, res) => {
  const { name, email, password, address, phoneNumber, role } = req.body;

  const checkQuery = "SELECT * FROM users WHERE email = ? OR phoneNumber = ?";
  db.query(checkQuery, [email, phoneNumber], (err, result) => {
    if (err) {
      console.error("Database query failed:", err);
      return res.status(500).json({ message: "Database query failed", error: err });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const insertQuery =
      "INSERT INTO users (name, email, password, address, phoneNumber, role) VALUES (?, ?, ?, ?, ?, 'user')";
    db.query(
      insertQuery,
      [name, email, password, address, phoneNumber, role],
      (err, result) => {
        if (err) {
          console.error("Error inserting user:", err);
          return res.status(500).json({ message: "Database insertion failed", error: err });
        }

        console.log("User inserted with role:", role);
        return res.status(201).json({ message: "User registered successfully" });
      }
    );
  });
});

module.exports = router;
