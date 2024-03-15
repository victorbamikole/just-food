const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    uid: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: Array, required: false },
    phone: { type: String, required: false },
    userType: {
      type: String,
      required: true,
      default: "Client",
      enum: ["Admin", "Driver", "Client", "Vendor"],
    },
    profile: {
      type: String,
      required: true,
      default:
        "https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_1280.jpg",
    },
  },
  { timestamps: true }
);

module.exports = ("User", UserSchema);
