const {gql} = require("apollo-server-express");

const typeDefs = gql`

  type Post {
     _id: ID
    title: String
    year: Int
    cast: [String]
    genres: [String]
  }
    
  type Query {
    getAllPosts(offset: Int, limit: Int): [Post]
    getPost(_id: ID): Post
    getPostByGenre(genre: String): [Post]
    getPostByTitle(title: String): [Post]
  }
`;

module.exports = typeDefs;