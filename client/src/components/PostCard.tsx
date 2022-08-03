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

const PostCard: React.FC<PostCardProps> = ({ post }) => {
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
    <div className="postCard">
      <div className="row jc-between bg-primary p2">
        <div className="column jc-between">
          <p className="m0">{post.username}</p>
          <p className="m0">{moment(post.createdAt).fromNow(false)}</p>
        </div>

        <img src={profileAvatar} />
      </div>
      <p>{post.body}</p>
      <hr />

      <div className="action-container jc-between">
        <div className="row align-center ">
          <div className="row align-center">
            <p className="">{post.likeCount}</p>
            <LikeButton post={post} />
          </div>
          <CommentButton post={post} />
        </div>
        <DeletePostButton post={post} />
      </div>

    </div>
  );
};

export default PostCard;
