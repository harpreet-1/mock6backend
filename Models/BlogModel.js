const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    title: { type: String, require: true },
    content: { type: String },
    category: { type: String, require: true },
    likes: { type: Number },
    comments: [
      {
        username: { type: String },
        content: { type: String },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const BlogModel = mongoose.model("Blog", blogSchema);

module.exports = BlogModel;

// {
//     "id" : 1
// "username": "coreyschafer",
// "title": "Be Present",
// "content": "Turning away from the ledge, he started slowly down the mountain, deciding that he would, that very night, satisfy his curiosity about the man-house. In the meantime, he would go down into the canyon and get a cool drink, after which he would visit some berry patches just over the ridge, and explore among the foothills a bit before his nap-time, which always came just after the sun had walked past the middle of the sky. At that period of the day the sun’s warm rays seemed to cast a sleepy spell over the silent mountainside, so all of the animals, with one accord, had decided it should be the hour for their mid-day sleep.",
//     "category" : "Entertainment",
//     "date" : "2017-06-01",
//     "likes" : 24,
//     "comments" : [{username : "Jane", content : "Good One"}, {username : "Bob", content : "Loved It!"}]
// }
