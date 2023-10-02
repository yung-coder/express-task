const axios = require("axios");
const _ = require("lodash");

const search = async (query) => {
  try {
    const response = await axios.get(
      "https://intent-kit-16.hasura.app/api/rest/blogs",
      {
        headers: {
          "x-hasura-admin-secret":
            "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
        },
      }
    );

    const blogData = response.data.blogs;

    const results = blogData.filter((blog) =>
      blog.title.toLowerCase().includes(query.toLowerCase())
    );

    return results;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const memoizedSearch = _.memoize(search, undefined, 600000);

module.exports = memoizedSearch;
