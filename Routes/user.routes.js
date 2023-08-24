const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");
const authorization = require("../middleware/Auth");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  try {
    let { email, password, avatar, username } = req.body;

    if (!email || !password || !avatar || !username) {
      return res
        .status(400)
        .json({ status: false, message: "please provide all details" });
    }

    let user = await UserModel.findOne({ email });

    if (user) {
      return res.status(200).json({
        status: true,
        message: "user alredy exist please login",
        user,
      });
    }

    let hash = await bcrypt.hash(password, 4);

    user = await UserModel.create({ email, password: hash, avatar, username });
    return res
      .status(200)
      .json({ status: true, message: "user registered successfully ", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "something went wrong try again later ",
    });
  }
});
userRouter.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "login failed ! please provide all details",
      });
    }

    let user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "login failed ! user not found please register",
      });
    }

    let hash = await bcrypt.compare(password, user.password);
    if (!hash) {
      return res
        .status(400)
        .json({ status: false, message: "login failed ! Invalid Password" });
    }

    const token = jwt.sign({ userId: user._id, email }, "jwtsecretkey");

    return res
      .status(200)
      .json({ status: true, message: "Login successfull", user, token });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: " something went wrong try again later ",
    });
  }
});

userRouter.get("/profile", authorization, async (req, res) => {
  try {
    let userId = req.userId;

    const user = await UserModel.findById(userId);

    return res.status(200).json({
      status: true,
      message: " login hai ",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: " something went wrong try again later ",
    });
  }
});
module.exports = userRouter;
