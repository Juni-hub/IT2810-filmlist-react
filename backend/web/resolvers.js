const { argsToArgsConfig } = require("graphql/type/definition");
const Post = require("./models/Post.model");

const resolvers = {
  Query: {
    getAllPosts: async (_, { offset, limit } ) => {
      const data = await Post.find();
      return data.slice(offset, limit + offset);
    },

    getPost: async (_parent, {id}, _context, _info ) => {
        return await Post.findById(id); 
    },

    getPostByGenre: async (_, {genre} ) => {
      const data = await Post.find();
      return data.filter((a) => a.genre.includes(genre))
    },

    getPostByTitle: async (_, {title} ) => {
      const data = await Post.find();
      return data.filter((a) => a.title.includes(title))
    },
  }
};

module.exports = resolvers;