const jwt = require("jsonwebtoken");

const verifytoken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split("")[1];
  }
};