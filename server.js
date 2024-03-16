const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const serviceAccount = require("./servicesAccountKey.json");

const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const restaurantRouter = require("./routes/restaurants");

dotenv.config();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use("/", authRouter);
app.use("/api/users", userRouter);
app.use("/api/restaurant", restaurantRouter);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server Running on http://localhost:${process.env.PORT}`);
});
