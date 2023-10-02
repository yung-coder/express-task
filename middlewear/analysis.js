const memoizedanalysis = require("../utils/fetchdata");

const fetchBlogStats = async (req, res, next) => {
  const Stats = await memoizedanalysis();

  req.blogStats = Stats;

  next();
};

module.exports = fetchBlogStats;
