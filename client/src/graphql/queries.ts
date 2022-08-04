import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query getPosts {
    getPosts {
      id
      body
      game
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
export const GET_POST = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      game
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

export const GET_PLATFORMS = gql`
  query getPlatforms {
    getPlatforms {
      id
      name
    }
  }
`;
export const GET_GAMES = gql`
  query getGames {
    getGames {
      id
      name
      releaseDate
      # platform
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
