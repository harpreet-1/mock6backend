const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlogModel = require("../Models/BlogModel");
const authorization = require("../middleware/Auth");

const blogRouter = express.Router();

blogRouter.post("/", async (req, res) => {
  try {
    let { username, title, content, category } = req.body;

    if (!content || !title || !category || !username) {
      return res
        .status(400)
        .json({ status: false, message: "please provide all details" });
    }

    let blog = await BlogModel.create(req.body);
    return res
      .status(200)
      .json({ status: true, message: "Blog Posted successfully ", blog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "something went wrong try again later ",
    });
  }
});

blogRouter.get("/", authorization, async (req, res) => {
  try {
    let { order, filter, search } = req.query;
    let query = {};
    let sort = {};
    if (order) {
      sort = { createdAt: order };
    }
    if (filter) {
      query.category = filter;
    }
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    console.log(query);
    const blogs = await BlogModel.find(query).sort(sort);
    return res.status(200).json({ status: true, blogs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "something went wrong try again later ",
    });
  }
});
blogRouter.get("/:id", authorization, async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id);
    return res.status(200).json({ status: true, blog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "something went wrong try again later ",
    });
  }
});
blogRouter.patch("/:id", authorization, async (req, res) => {
  try {
    const blog = await BlogModel.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({ status: true, message: "blog updted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "something went wrong try again later ",
    });
  }
});
blogRouter.delete("/:id", authorization, async (req, res) => {
  try {
    const blog = await BlogModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ status: true, message: "blog deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "something went wrong try again later ",
    });
  }
});

module.exports = blogRouter;
