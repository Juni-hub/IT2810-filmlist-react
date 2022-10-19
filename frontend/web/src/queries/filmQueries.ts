import { gql } from '@apollo/client'

export const SEARCH_FILMS = gql`
  query getPosts($limit: Int!, $offset: Int!, $titleFilter: String, $genreFilter: String, $yearFilter: Int) {
    getFilteredPosts(limit: $limit, offset: $offset, titleFilter: $titleFilter, genreFilter: $genreFilter, yearFilter: $yearFilter) {
        _id
        title
        year
        cast
        genres
    }
  },
`;

export const ADD_FILM = gql`
  mutation createPost($title: String!, $year: Int, $cast: [String], $genres: [String]) {
    createPost(title: $title, year: $year, cast: $cast, genres: $genres) {
      _id
      title
      year
      cast
      genres
    }
  }
`