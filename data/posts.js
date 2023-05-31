const { Post } = require("../models/post");

const getAllPosts = async (
  pageNumber,
  itemsPerPage,
  search,
  startDate,
  endDate,
  topic,
  filter
) => {
  const pipeline = [];

  const $match = {};

  if (search) {
    const searchRegex = new RegExp(search, "i");
    $match["$or"] = [
      { title: { $regex: searchRegex } },
      { subtitle: { $regex: searchRegex } },
      { description: { $regex: searchRegex } },
    ];
  }

  if (startDate && endDate) {
    $match["postDate"] = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  if (topic) {
    $match["topic"] = topic;
  }

  const totalPosts = await Post.countDocuments($match);
  if (!totalPosts) return { totalPosts, posts: [] };

  pipeline.push({ $match });

  if (filter === "Alphabet") {
    pipeline.push({ $sort: { title: 1 } });
  } else if (filter === "Date created") {
    pipeline.push({ $sort: { postDate: -1 } });
  }

  pipeline.push(
    { $skip: (pageNumber - 1) * itemsPerPage },
    { $limit: itemsPerPage },
    { $sort: { postDate: -1 } }
  );

  const posts = await Post.aggregate(pipeline);

  return { posts, totalPosts };
};

const getById = (postId) => {
  return Post.findOne({ postId });
};

const create = (post) => {
  return Post.create(post);
};

const update = (postId, body) => {
  return Post.findByIdAndUpdate(postId, body, {
    new: true,
  });
};

module.exports = {
  getAllPosts,
  getById,
  create,
  update,
};
