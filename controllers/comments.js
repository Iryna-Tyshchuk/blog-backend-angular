const { Comment } = require("../models/comment");

const { HttpError, ctrlWrapper } = require("../helpers");

const createComment = async (req, res) => {
  const { postId } = req.params;
  const { author, comment } = req.body;

  const newComment = new Comment({
    author,
    comment,
    owner: postId,
  });

  await newComment.save();

  res.status(201).json(newComment);
};

const getComments = async (req, res) => {
  const postId = req.params.postId;
  Comment.find({ owner: postId })
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch comments for the post" });
    });
};

module.exports = {
  createComment: ctrlWrapper(createComment),
  getComments: ctrlWrapper(getComments),
};
