const postDataService = require("../data/posts");

const getFilteredPosts = async (filters) => {
  const posts = await postDataService.getAll(filters);
  return posts;
};
const getPostById = async (postId) => {
  const post = await postDataService.getById(postId);
  return post;
};
const createPost = async (post) => {
    // const post = new Post(postData);
    // const createdPost = await post.save();
    // return createdPost;
  return await postDataService.create(post);
};
const updatePost = async (post) => {

};
module.exports = {
  getFilteredPosts,
  getPostById,
  createPost,
  updatePost,
};
