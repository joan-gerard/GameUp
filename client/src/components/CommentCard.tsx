import React from "react";
import moment from "moment";
import { useAuthContext } from "../context/auth";
import { FaTrash } from "react-icons/fa";
import { DELETE_COMMENT } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import avatar from "./assets/avatar.png";

const CommentCard: React.FC<CommentCardProps> = ({ comment, id }) => {
  const { user } = useAuthContext();

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    variables: { postId: id, commentId: comment.id },
    update() {},

    //   refetchQueries: [{ query: GET_POSTS }],
  });

  const handleDeletePost = () => {
    deleteComment();
  };

  return (
    <div className="comment-card">
      <div className="comment-card__header">
        <div className="comment-card__user">
          <img className="avatar" src={avatar} alt="avatar" />
          <p className="">{comment.username}</p>
        </div>
        <p className="moment-date">
          {moment(comment.createdAt).fromNow(false)}
        </p>
        {/* <p className="post__game-title">{comment.game}</p> */}
      </div>
      <div className="comment-card__body">
        <p>{comment.body}</p>
      </div>
      {user && user.username === comment.username && (
        <button className="delete-comment__button" onClick={handleDeletePost}>
          <FaTrash />
        </button>
      )}

      {/* <hr className="hr-thin" /> */}
    </div>
  );
};

export default CommentCard;

{
  /* <hr className="hr-thin" />

      <div className="post_action-container">
        <div className="post_action-buttons">
          <LikeButton post={post} />
          <CommentButton post={post} />
        </div>
        <DeletePostButton post={post} />
      </div> */
}

{
  /* </Card> */
}

{
  /* <div className="post-comment__container">
        <div className="post-comment__header">
          <div className="post-comment__user">
            <img src={avatar} className="comment-avatar" alt="avatar" />
            <div className="post-comment__info">
              <p>{comment.username}</p>
              <p className="m0 moment-date">
                {moment(comment.createdAt).fromNow(false)}
              </p>
            </div>
          </div>
          {user && user.username === comment.username && (
            <button className="ml10" onClick={handleDeletePost}>
              <FaTrash />
            </button>
          )}
        </div>
        <p className="post-comment__body">{comment.body}</p>
      </div> */
}
