import { gql } from '@apollo/client';

export const QUERY_SAVE_BOOK = gql`
  query thoughts($username: String) {
    thoughts(username: $username) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;


export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookID
        authors
        description
        image
        link
      }
    }
  }
`;


export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
      books {
        bookID
        authors
        description
        image
        link
        }
      }
    }
`;

