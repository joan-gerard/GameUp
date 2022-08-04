import React from "react";
import { FaRegCommentDots } from "react-icons/fa";

const CommentButton: React.FC<CommentButtonProps> = ({ post }) => {
  const commentOnPost = () => {
    console.log("comment added");
  };

  return (
    <div className="comment-actions">
      <p>{post.commentCount}</p>
      <div onClick={commentOnPost}>
        <a href={`/post/${post.id}`}>
          <FaRegCommentDots />
        </a>
      </div>
    </div>
  );
};

export default CommentButton;
