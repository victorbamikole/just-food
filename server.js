const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const serviceAccount = require("./servicesAccountKey.json");

const app = express();
const PORT = 6002;

const authRouter = require("./routes/auth");

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

app.use("/", authRouter);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server Running on http://localhost:${process.env.PORT}`);
});
