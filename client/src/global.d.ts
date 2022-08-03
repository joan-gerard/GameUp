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

type PostCardProps = {
  post: Post;
};

type RedirectProps = {
  to: string;
};

type AllPosts = {
  data: [Post];
  getPosts: null | [Post];
};

type CommentButtonProps = {
  post: Post;
};

// @ts-ignore
