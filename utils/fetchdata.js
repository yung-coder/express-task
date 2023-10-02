const axios = require("axios");
const _ = require("lodash");

const fetchBlogStats = async () => {
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

    const totalBlogs = blogData.length;
    const blogWithLongestTitle = _.maxBy(blogData, "title.length");
    const blogsWithPrivacy = blogData.filter((blog) =>
      blog.title.toLowerCase().includes("privacy")
    );
    const uniqueBlogTitles = _.uniqBy(blogData, "title");

    let blogStats = {
      totalBlogs,
      blogWithLongestTitle,
      numberOfBlogsWithPrivacy: blogsWithPrivacy.length,
      uniqueBlogTitles,
    };

    return blogStats;
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const memoizedanalysis = _.memoize(fetchBlogStats, undefined, 600000);

module.exports = memoizedanalysis;
