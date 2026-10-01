import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/api/categories", (req, res) => {
  const categories = [
    { id: 1, name: "JavaScript" },
    { id: 2, name: "SQL" },
  ];

  res.json(categories);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
