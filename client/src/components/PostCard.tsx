import React from "react";
import moment from "moment";

import CommentButton from "./CommentButton";
import avatar from "./assets/avatar.png";
import DeletePostButton from "./DeletePostButton";
import LikeButton from "./LikeButton";
import { useAuthContext } from "../context/auth";

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useAuthContext();
  return (
    <div className="post-card">
      <div className="post-card__header">
        <div className="post-card__user">
          {user && (
            <img
              className="avatar"
              src={avatar}
              // src={!user.profileImageUrl ? avatar : user.profileImageUrl}
              alt="avatar"
            />
          )}
          <p className="post__username">@{post.username}</p>
        </div>
        <p className="post__date">{moment(post.createdAt).fromNow(false)}</p>
      </div>
      <div className="post-card__game">
        <img
          src="https://res.cloudinary.com/dpo5hvd8r/image/upload/v1660819667/my-games/tsztfoiu49xcqlqu6xyq.jpg"
          alt="game"
        />
        <div className="game-info">
          <p className="game-title">{post.game}</p>
          <p className="game-platform">PS5</p>
        </div>
      </div>
      <div className="post-card__body">
        <p>{post.body}</p>
      </div>
      <div className="post-card__actions">
        <div className="post-card__buttons">
          <LikeButton post={post} />
          <CommentButton post={post} />
        </div>
        <DeletePostButton post={post} />
      </div>
    </div>
  );
};

export default PostCard;
