type PostCardProps = {
  post: any;
};

type RedirectProps = {
  to: string;
};

type RegisterProps = {};

type Post = {
  body: string;
  id: string;
  username: string;
  createdAt: string;
  commentCount: number;
  likeCount: number;
  comments: {
    body: string;
    createdAt: string;
    id: string;
    username: string;
  };
  likes: {
    username: string;
  };
};

type AllPosts = {
  data: [Post];
  getPosts: null | [Post]
};

// @ts-ignore
