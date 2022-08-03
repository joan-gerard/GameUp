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

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useAuthContext();

  const likePost = () => {
    console.log("post liked");
  };

  console.log("postcard", user?.username);
  console.log("postcard post", post.username);

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
            <button onClick={likePost}>
              <FaThumbsUp />
            </button>
          </div>
          <CommentButton post={post} />
        </div>
        {user?.username === post.username ? (
          <button className="ml10" onClick={() => {}}>
            <FaTrash />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default PostCard;
