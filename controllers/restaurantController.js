const Restaurant = require("../models/Restaurants");

module.exports = {
  addRestaurant: async (req, res) => {
    const newRestaurant = new Restaurant(req.body);
    console.log("VERIFIED-USER", newRestaurant);
    try {
      await newRestaurant.save();
      res
        .status(201)
        .json({ status: true, message: "Restaurant successfully created" });
    } catch (error) {
      res
        .status(500)
        .json({ status: false, message: "Error creating restaurant",  error: error.message});
    }
  },

  serviceAvailability: async (req, res) => {
    const restaurantId = req.params;

    try {
      const restaurant = await Restaurant.findById(restaurantId);

      if (!restaurant) {
        return res
          .status(403)
          .json({ status: false, message: "Restaurant not found" });
      }
      restaurant.isAvailable = !restaurant.isAvailable;
      await restaurant.save();
      res.status(200).json({
        status: true,
        message: "Availability successfully toggled",
        isAvailable: restaurant.isAvailable,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Error toggling restaurant availability",
      });
    }
  },

  deleteRestaurant: async (req, res) => {
    const restaurantId = req.params.id;
    try {
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res
          .status(404)
          .json({ status: false, message: "Restaurant not found" });
      }

      await Restaurant.findByIdAndDelete(restaurantId);
      res.status(200).json({
        status: true,
        message: "Restaurant deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Error deleting restaurant",
      });
    }
  },

  getRestaurant: async (req, res) => {
    const restaurantId = req.params.id;
    try {
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res
          .status(404)
          .json({ status: false, message: "Restaurant not found" });
      }
      await Restaurant.findById(restaurantId);
      res.status(200).json({
        restaurant,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Error retrieving the restaurant",
      });
    }
  },

  getRandomRestaurants: async (req, res) => {
    try {
      let randomRestaurants = [];

      if (req.params.code) {
        randomRestaurants = await Restaurant.aggregate([
          { $match: { code: req.params.code } },
          { $sample: { size: 5 } },
          { $project: { ___V: 0 } },
        ]);
      }

      if (!randomRestaurants.length) {
        randomRestaurants = await Restaurant.aggregate([
          { $sample: { size: 5 } },
          { $project: { ___V: 0 } },
        ]);
      }

      if (randomRestaurants.length) {
        res.status(200).json({
          randomRestaurants,
        });
      }
    } catch (error) {
        res.status(500).json({
          status: false,
          message: "No restaurant found",
        });
    }
  },
};
