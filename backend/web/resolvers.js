const { argsToArgsConfig } = require("graphql/type/definition");
const Post = require("./models/Post.model");

const resolvers = {
  Query: {

    getFilteredPosts: async (_, { offset, limit, titleFilter, genreFilter } ) => {
      let data = await Post.find();
      if (titleFilter != "") {
        data = await Post.find({ title: { $regex: new RegExp(titleFilter, "i") } })
      } if (genreFilter != "") {
        data = await Post.find({ genres : { $all : [genreFilter] }})
      }

      return data.slice(offset, limit + offset);
    },

    getFilteredPostsByGenre: async (_, { offset, limit, filter } ) => {
      const data = await Post.find({ genres: { $regex: new RegExp(filter, "i") } })
      return data.slice(offset, limit + offset);
    },

    getFilteredPostsByYear: async (_, { offset, limit, filter } ) => {
      const data = await Post.find({ year: filter })
      return data.slice(offset, limit + offset);
    },

    getAllPosts: async (_, { offset, limit } ) => {
      const data = await Post.find();
      return data.slice(offset, limit + offset);
    },
  }
};

module.exports = resolvers;