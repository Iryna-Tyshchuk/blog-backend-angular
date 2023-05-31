const postData = require("../data/posts");

const getAllPostsService = async (
  pageNumber,
  itemsPerPage,
  search,
  startDate,
  endDate,
  topic,
  filter
) => {
  const {posts, totalPosts} = await postData.getAllPosts(
    pageNumber,
    itemsPerPage,
    search,
    startDate,
    endDate,
    topic,
    filter
  );

  return {posts, totalPosts};
};

const getPostById = async (postId) => {
  const post = await postData.getById(postId);
  return post;
};
const createPost = async (post) => {
  // const post = new Post(postData);
  // const createdPost = await post.save();
  // return createdPost;
  return await postData.create(post);
};
const updatePost = async (post) => {};
module.exports = {
  getAllPostsService,
  getPostById,
  createPost,
  updatePost,
};
