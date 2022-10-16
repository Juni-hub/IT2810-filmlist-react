import { gql } from '@apollo/client'

export const GET_FILMS = gql`
    query Films($limit: Int!, $offset: Int!) {
        getPosts(limit: $limit, offset: $offset) {
            _id
            title
            year
            cast
            genres
        }
    }
`;

export const SEARCH_FILMS = gql`
  query getPosts($limit: Int!, $offset: Int!, $titleFilter: String, $genreFilter: String) {
    getFilteredPosts(limit: $limit, offset: $offset, titleFilter: $titleFilter, genreFilter: $genreFilter) {
        _id
        title
        year
        cast
        genres
    }
  }

`;

export const SEARCH_FILMS_YEAS = gql`
  query getPostsByGenre($limit: Int!, $offset: Int!, $filter: String) {
    getFilteredPostsByYear(limit: $limit, offset: $offset, filter: $filter) {
        _id
        title
        year
        cast
        genres
    }
  }
`;
