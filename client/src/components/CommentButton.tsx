import React from "react";
import { FaRegCommentDots } from "react-icons/fa";

const CommentButton: React.FC<CommentButtonProps> = ({ post }) => {
  console.log(post.comments.length);

  return (
    <div className="comment-actions">
      <p>{post.comments.length}</p>
      <div>
        <a
          className={post.comments.length > 0 ? "comment-button" : ""}
          href={`/post/${post.id}`}
        >
          <FaRegCommentDots />
        </a>
      </div>
    </div>
  );
};

export default CommentButton;
