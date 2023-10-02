const searchMemoized = require("../utils/search");

const searchBlogs = async (req, res, next) => {
  const { query } = req.query;

  if (!query) {
    return res
      .status(400)
      .json({ error: 'Query parameter "query" is required.' });
  }

  const searchResults = await searchMemoized(query);

  req.search = {
    Results: searchResults,
  };

  next();
};

module.exports = searchBlogs;
