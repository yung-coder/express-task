const express = require("express");
const fetchBlogStatsMiddleware = require("./middlewear/analysis");
const searchBlogMiddlewear = require("./middlewear/SearchBlogs");
const notFound = require("./middlewear/not-found");
const path = require("path");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.get("/api/stats", fetchBlogStatsMiddleware, (req, res) => {
  const {
    totalBlogs,
    blogWithLongestTitle,
    numberOfBlogsWithPrivacy,
    uniqueBlogTitles,
  } = req.blogStats;

  const analysisResult = {
    totalBlogs,
    blogWithLongestTitle,
    numberOfBlogsWithPrivacy,
    uniqueBlogTitles,
  };

  res.json(analysisResult);
});

app.get("/api/search", searchBlogMiddlewear, (req, res) => {
  const { Results } = req.search;

  const searchResults = {
    Results,
  };

  res.json(searchResults);
});

app.use(notFound);

const start = async () => {
  try {
    app.listen(port, console.log(`Server started at ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();