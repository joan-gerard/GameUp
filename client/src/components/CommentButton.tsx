import React from "react";
import { FaRegCommentDots } from "react-icons/fa";

const CommentButton: React.FC<CommentButtonProps> = ({ post }) => {

  return (
    <div className="comment-actions">
      <p>{post.comments.length}</p>
      <div>
        <a href={`/post/${post.id}`}>
          <FaRegCommentDots />
        </a>
      </div>
    </div>
  );
};

export default CommentButton;
