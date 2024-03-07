import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import admin from "firebase-admin";
import serviceAccount from "./servicesAccountKey.json" assert { type: "json" };

const app = express();

const PORT = 3000;
dotenv.config();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use(bodyParser.json);
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server Running on http://localhost:${process.env.PORT}`);
});
