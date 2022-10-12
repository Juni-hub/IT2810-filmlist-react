const Post = require("./models/Post.model");
const resolvers = {
  Query: {
    getAllPosts: async () => {
      return await Post.find();
    },
    getPost: async (_parent,{id},_context,_info) => {
        return await Post.findById(id);
    }
  }
};

module.exports = resolvers;
  