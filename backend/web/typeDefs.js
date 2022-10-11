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
    hello: String

    getAllPosts: [Post]
    getPost(_id: ID): Post
  }
`;

module.exports = typeDefs;