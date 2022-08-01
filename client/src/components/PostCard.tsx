import React from "react";
import moment from "moment";
import { FaThumbsUp, FaRegCommentDots } from "react-icons/fa";

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const likePost = () => {
    console.log("post liked");
  };
  const commentOnPost = () => {
    console.log("comment added");
  };

  return (
    <div className="postCard">
      <div className="row jc-between bg-primary p2">
        <div className="column jc-between">
          <p className="m0">{post.username}</p>
          <p className="m0">{moment(post.createdAt).fromNow(false)}</p>
        </div>

        <img src="https://react.semantic-ui.com/images/avatar/small/molly.png" />
      </div>
      <p>{post.body}</p>
      <hr />

      <div className="action-container">
        <div className="row align-center">
          <p className="">{post.likeCount}</p>
          <button onClick={likePost}>
            <FaThumbsUp />
          </button>
        </div>
        <div className="row align-center">
          <p>{post.commentCount}</p>
          <button onClick={commentOnPost}>
            <FaRegCommentDots />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
