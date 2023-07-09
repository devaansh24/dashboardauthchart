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
  database: "dashboardauth",
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to database.");
  }
});





app.get("/api/data", (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const pageSize = parseInt(req.query.pageSize) || 20; 

  const startIndex = (page - 1) * pageSize; 
  const endIndex = page * pageSize; 

  const query = "SELECT * FROM bigdata LIMIT ?, ?"; 

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
