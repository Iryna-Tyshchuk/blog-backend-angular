const { Post } = require("../models/post");

const { HttpError, ctrlWrapper } = require("../helpers");
const { getAllPostsService } = require("../services/postService");

// const getAll = async (req, res) => {
//   const { page, perPage, search, startDate, endDate, topic, filter } =
//     req.query;

//   const pageNumber = parseInt(page) || 1;
//   const itemsPerPage = parseInt(perPage) || 10;

//   const pipeline = [];

//   const $match = {};

//   if (search) {
//     const searchRegex = new RegExp(search, "i");
//     $match["$or"] = [
//       { title: { $regex: searchRegex } },
//       { subtitle: { $regex: searchRegex } },
//       { description: { $regex: searchRegex } },
//     ];
//   }

//   if (startDate && endDate) {
//     $match["postDate"] = {
//       $gte: new Date(startDate),
//       $lte: new Date(endDate),
//     };
//   }

//   if (topic) {
//     $match["topic"] = topic;
//   }

//   // const postsCount = await Post.countDocuments($match);
//   // if (postsCount) [];
//   const totalPosts = await Post.countDocuments($match);
//   pipeline.push({ $match });

//   if (filter === "Alphabet") {
//     pipeline.push({ $sort: { title: 1 } });
//   } else if (filter === "Date created") {
//     pipeline.push({ $sort: { postDate: -1 } });
//   }

//   pipeline.push(
//     { $skip: (pageNumber - 1) * itemsPerPage },
//     { $limit: itemsPerPage }
//   );

//   pipeline.push({ $sort: { postDate: -1 } });

//   const posts = await Post.aggregate(pipeline);

//   res.json({ posts, totalPosts });
// };

const getPostsByTopic = async (req, res) => {
  const { topic } = req.query;
  let query = {};
  if (topic) {
    query = { topic: topic };
  }

  const posts = await Post.find(query, "-createdAt -updatedAt");
  res.json(posts);
};

const getById = async (req, res) => {
  const { postId } = req.params;
  const result = await Post.findById(postId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await Post.create(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  // const { postId } = req.params;
  // const result = await Post.findByIdAndUpdate(postId, req.body, {
  //   new: true,
  // });
  // if (!result) {
  //   throw HttpError(404, "Not found");
  // }
  // res.json(result);

  const { postId } = req.params;
  const { title, subtitle, description, topic } = req.body;
  const result = await Post.updateOne(
    { _id: postId },
    { title, subtitle, description, topic }
  );

  if (req.files && req.files.length > 0) {
    const images = req.files.map((file) => {
      return {
        url: file.path,
        titleImg: file.originalname,
      };
    });

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $push: { images: { $each: images } } },
      { new: true }
    );

    if (!updatedPost) {
      throw HttpError(404, "Not found");
    }

    res.json(updatedPost);
  } else {
    res.json(result);
  }
};

const deleteById = async (req, res) => {
  const { postId } = req.params;
  const result = await Post.findByIdAndRemove(postId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Delete success",
  });
};


const getAll = async (req, res) => {
  const { page, perPage, search, startDate, endDate, topic, filter } =
    req.query;

  const pageNumber = parseInt(page) || 1;
  const itemsPerPage = parseInt(perPage) || 10;

  const { posts, totalPosts } = await getAllPostsService(
    pageNumber,
    itemsPerPage,
    search,
    startDate,
    endDate,
    topic,
    filter
  );

  res.json({ posts, totalPosts });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getPostsByTopic: ctrlWrapper(getPostsByTopic),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};