const express = require("express");
const app = express();

app.use(express.json());
const cors = require("cors");
app.use(cors());
const dbConnection = require("./db");
const userRouter = require("./Routes/user.routes");
const blogRouter = require("./Routes/blogs.routes");

app.use("/api", userRouter);
app.use("/api/blogs", blogRouter);
app.get("/", (req, res) => {
  res.json({ message: "welcome from server" });
});
app.listen(8000, () => {
  dbConnection();
  console.log("server is started at 8000");
});
