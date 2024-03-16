const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    time: { type: String, required: true },
    imageUrl: { type: String, required: true },
    foods: { type: Array },
    pickUp: { type: Boolean, required: false, default: true },
    delivery: { type: Boolean, required: false, default: true },
    owner: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    code: { type: String, required: true }, 
    logoUrl: {
      type: String,
      required: true,
      default:
        "https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_1280.jpg",
    },
    rating: { type: Number, min: 1, max: 5 },
    ratingCount: { type: String },
    coords: {
      id: { String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      latitudeDelta: { type: Number, required: true },
      longitudeDelta: { type: Number, required: true },
      address: { type: String, required: true },
      title: { type: String, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
