// api.js
const express = require("express");
const router = express.Router();
const db = require("./db").default;

router.get("/data", (req, res) => {
  const query = "SELECT * FROM your_table_name";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
