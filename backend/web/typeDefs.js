const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Post {
     _id: ID
    title: String
    year: Int
    cast: [String]
    genres: [String]
  }
    
  type Query {
    getFilteredPosts(offset: Int, limit: Int, titleFilter: String, genreFilter: String, yearFilter: Int): [Post!]
    getAllPosts(offset: Int, limit: Int): [Post!]
    getPost(_id: ID): Post
  }

  type Mutation {
    createPost(title: String, year: Int, cast: [String], genres: [String]): Post
  }
`;

module.exports = typeDefs;