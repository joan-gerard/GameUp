type Comment = {
  id: string;
  body: string;
  username: string;
  createdAt: string;
};

type Post = {
  body: string;
  id: string;
  username: string;
  game: string;
  createdAt: string;
  // commentCount: number;
  // likeCount: number;
  comments: [
    {
      body: string;
      createdAt: string;
      id: string;
      username: string;
    }
  ];
  likes: {
    [username: string];
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
type DeletePostButtonProps = {
  post: Post;
};
type LikeButtonProps = {
  post: Post;
};
type CommentCardProps = {
  comment: {
    id: string;
    body: string;
    username: string;
    createdAt: string;
  };
  id: string | undefined;
};

type AddCommentFormProps = {
  id: string | undefined;
};

type GameListSelectProps = {
  gameState: string[];
  setGameState: any;
};

type GET_POSTS_readQuery = {
  getPosts: [Post];
};

type ProfileImageUploaderProps = {
  setProfileImageUrl: (imageUrl: string) => void;
};

type PostFormProps = {
  setPostFormIsShowing: (a: boolean) => void;
};

// @ts-ignore
