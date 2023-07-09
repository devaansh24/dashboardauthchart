import { createConnection } from "mysql";
import cors from "cors";
import express from "express";
const app = express();

app.use(cors());
// Create a MySQL connection
const connection = createConnection({
  host: "Devanshs-MacBook-Air.local",
//   host: "localhost",
  user: "root",
  password: "mysql@123",
  database: "dashboard",
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to database.");
  }
});

// Define your routes here
app.get("/", (req, res) => {
  res.send("hello world");
});

// app.get("/api/data", (req, res) => {
//   const query = "SELECT * FROM jsondata";
//   connection.query(query, (err, results) => {
//     if (err) {
//       console.error("Error fetching data:", err);
//       res.status(500).json({ error: "Internal Server Error" });
//     } else {
//       res.json(results);
//     }
//   });
// });

app.get("/api/data", (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the requested page number from the query parameters
  const pageSize = parseInt(req.query.pageSize) || 2; // Get the requested page size from the query parameters

  const startIndex = (page - 1) * pageSize; // Calculate the start index for the current page
  const endIndex = page * pageSize; // Calculate the end index for the current page

  const query = "SELECT * FROM jsondata LIMIT ?, ?"; // Use the LIMIT clause to retrieve a subset of data based on the page number and size

  connection.query(query, [startIndex, pageSize], (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const responseData = {
        currentPage: page,
        pageSize: pageSize,
        totalPages: Math.ceil(results.length / pageSize),
        totalItems: results.length,
        data: results.slice(startIndex, endIndex),
      };

      res.json(responseData);
    }
  });
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
