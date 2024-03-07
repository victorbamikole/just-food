import express from "express";

const app = express();
// require('dotenv').config();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
