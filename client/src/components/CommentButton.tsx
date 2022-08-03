import React from "react";
import { FaRegCommentDots } from "react-icons/fa";

const CommentButton: React.FC<CommentButtonProps> = ({ post }) => {
  const commentOnPost = () => {
    console.log("comment added");
  };

  return (
    <div className="row align-center">
      <p>{post.commentCount}</p>
      <button onClick={commentOnPost}>
      <a href={`/post/${post.id}`}><FaRegCommentDots /></a>

        
      </button>
    </div>
  );
};

export default CommentButton;
