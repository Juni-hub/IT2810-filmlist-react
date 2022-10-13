import { gql } from '@apollo/client'

export const GET_FILMS = gql`
    query Films($limit: Int!, $offset: Int!) {
        getAllPosts(limit: $limit, offset: $offset) {
            _id
            title
            year
            cast
            genres
        }
    }
`;

export const GET_FILM_ITEM = gql`
    query GetFilmItem($title: String) {
        getPost( title: $title) {
            _id
            title
            year
            cast
            genres
        }
    }
`;

export const GET_FILM_ITEM_BY_GENRE = gql`
    query GetFilmItem($title: String!) {
        getPostByTitle( title: $title) {
            _id
            title
            year
            cast
            genres
        }
    }
`;