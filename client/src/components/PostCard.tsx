import React from "react";
import moment from "moment";

import CommentButton from "./CommentButton";
import female1 from "./assets/female1.png";
import female5 from "./assets/female5.png";
import male3 from "./assets/male3.png";
import male6 from "./assets/male6.png";
import avatar from "./assets/avatar.png";
import DeletePostButton from "./DeletePostButton";
import LikeButton from "./LikeButton";
import { Card } from "@mui/material";
import { useAuthContext } from "../context/auth";

const light = "#322651";
const white = "#FFFFFF";

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useAuthContext();

  const profileAvatar =
    post.username === "jose"
      ? male3
      : post.username === "john"
      ? male6
      : post.username === "molly"
      ? female1
      : post.username === "jane"
      ? female5
      : avatar;

  return (
    <Card
      // sx={{
      //   backgroundColor: light,
      //   margin: "0 15px",
      //   marginBottom: "10px",
      //   padding: 2,
      //   borderRadius: "16px",
      //   color: white,
      // }}
    >
      <div className="jc-between">
        <div className="post__user-info">
          {user && (
            <img
              className="avatar"
              src={profileAvatar}
              // src={!user.profileImageUrl ? avatar : user.profileImageUrl}
              alt="avatar"
            />
          )}
          <div className="post__username">
            <p className="">{post.username}</p>
            <p className="moment-date">
              {moment(post.createdAt).fromNow(false)}
            </p>
          </div>
        </div>
        <p className="post__game-title">{post.game}</p>
      </div>
      <div className="post-body">
        <p>{post.body}</p>
      </div>

      <hr className="hr-thin" />

      <div className="post_action-container">
        <div className="post_action-buttons">
          <LikeButton post={post} />
          <CommentButton post={post} />
        </div>
        <DeletePostButton post={post} />
      </div>
    </Card>
  );
};

export default PostCard;
