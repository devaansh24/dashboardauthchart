import { createConnection } from "mysql";

const connection = createConnection({
  host: "'Devanshs-MacBook-Air.local'",
  user: "'root@localhost'",
  password: "Lokesh@1997",
  database: "dashboard",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to database.");
  }
});

export default connection;
