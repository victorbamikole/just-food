const User = require("../models/User");
const CryptoJS = require("crypto-js");
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (res, req) => {
    const user = req.body;
    try {
      await admin.auth().getUserByEmail(user.email);
      res.status(400).json({ message: "Email already registered" });
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        try {
          const userResponse = await admin.auth().createUser({
            email: user.email,
            password: user.password,
            emailVerified: false,
            disabled: false,
          });
          const newUser = new User({
            user: user.userName,
            email: user.email,
            password: CryptoJS.AES.encrypt(
              user.password,
              process.env.SECERET
            ).toString(),
            uid: userResponse.uid,
            userType: "Client",
          });

          await newUser.save();
          res.status(201).json({ message: true });
        } catch (error) {
          res.status(501).json({ message: false, error: error.message });
        }
      }
    }
  },
  loginUser: async (res, req) => {
    try {
      const user = await User.findOne(
        { email: req.body.email },
        { __v: 0, updatedAt: 0, createdAt: 0, email: 0 }
      );
      !user && res.status(401).json;
      ("Wrong Credentials");

      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECERET
      );
      const decrypted = decryptedPassword.toString(CryptoJS.enc.Utf8);

      decrypted != req.body.password && res.status(401).json;
      ("Wrong Password");

      const usertoken = jwt.sign(
        {
          id: user.id,
          userType: user.userType,
          email: user.email,
        },
        process.env.JWT_SEC,
        { expiresIn: "21d" }
      );
      const { password, email, ...others } = user._doc;

      res.status(200).json({ ...others, usertoken });
    } catch (error) {
      res.status(501).json({ message: false, error: error.message });
    }
  },
};


