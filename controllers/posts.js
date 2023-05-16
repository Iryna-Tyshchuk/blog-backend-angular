const { Post } = require("../models/post");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Post.find({}, "-createdAt -updatedAt");
  res.json(result);
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
  const { postId } = req.params;
  const result = await Post.findByIdAndUpdate(postId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { postId } = req.params;
  const result = await Post.findByIdAndRemove(postId);
  if (!result) {
      throw HttpError(404, "Not found");
  }
  res.json({
      message: "Delete success"
  })
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
