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
    getFilteredPostsByGenre(offset: Int, limit: Int, filter: String): [Post!]
    getFilteredPostsByYear(offset: Int, limit: Int, filter: String): [Post!]
    getAllPosts(offset: Int, limit: Int): [Post!]
    getPost(_id: ID): Post
  }
`;

module.exports = typeDefs;