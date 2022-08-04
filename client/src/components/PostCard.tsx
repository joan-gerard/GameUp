import React, { useCallback } from "react";
import moment from "moment";

import { FaThumbsUp, FaRegCommentDots, FaTrash } from "react-icons/fa";
import CommentButton from "./CommentButton";
import { useAuthContext } from "../context/auth";
import female1 from "./assets/female1.png";
import female5 from "./assets/female5.png";
import male3 from "./assets/male3.png";
import male6 from "./assets/male6.png";
import avatar from "./assets/avatar.png";
import DeletePostButton from "./DeletePostButton";
import LikeButton from "./LikeButton";
import { Card, Container } from "@mui/material";

const light = "#322651";
const white = "#FFFFFF";

const PostCard: React.FC<PostCardProps> = ({ post }) => {

  console.log(post)
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
      sx={{
        backgroundColor: light,
        margin: "0 15px",
        marginBottom: '10px',
        padding: 2,
        borderRadius: "16px",
        color: white,
      }}
    >
      <div className="post__user-info">
        <img className="avatar" src={profileAvatar} />
        <div className="">
          <p className="">{post.username}</p>
          <p className="">{moment(post.createdAt).fromNow(false)}</p>
        </div>
      </div>
      <p>{post.body}</p>
      <p>{post.game}</p>

      <hr />

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
