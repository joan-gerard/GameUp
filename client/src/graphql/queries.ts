import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query getPosts {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      commentCount
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

// query getPosts {
//     id
//     body
//     createdAt
//     username
//     likeCount
//     commentCount
//     likes {
//       username
//     }
//     comments {
//       id
//       username
//       createdAt
//       body
//     }
//   }
