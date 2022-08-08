import React from "react";
import moment from "moment";
import { useAuthContext } from "../context/auth";
import { FaTrash } from "react-icons/fa";
import { DELETE_COMMENT } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import avatar from "./assets/avatar.png";

// type PostCommentProps = {
//   id: string;
//   body: string;
//   username: string;
//   createdAt: string;
// };

// const light = "#322651";
// const white = "#FFFFFF";

const PostComment: React.FC<PostCommentProps> = ({ comment, id }) => {
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
    <>
      {/* <Card
        sx={{
          backgroundColor: light,
          margin: "0 15px",
          marginBottom: "10px",
          padding: 2,
          borderRadius: "16px",
          color: white,
        }}
      > */}
      <>
        <div className="comment-container">
          <div className="post__user-info">
            <div className="align-items">
              <img className="avatar" src={avatar} alt="avatar" />
              <div className="post__username">
                <p className="">{comment.username}</p>
                <p className="moment-date">
                  {moment(comment.createdAt).fromNow(false)}
                </p>
              </div>
            </div>
            {user && user.username === comment.username && (
              <button className="delete-comment__button" onClick={handleDeletePost}>
                <FaTrash />
              </button>
            )}
          </div>
          {/* <p className="post__game-title">{comment.game}</p> */}
        </div>
        <div className="post-body">
          <p>{comment.body}</p>
        </div>
        <hr className="hr-thin" />
        {/* <hr className="hr-thin" />

      <div className="post_action-container">
        <div className="post_action-buttons">
          <LikeButton post={post} />
          <CommentButton post={post} />
        </div>
        <DeletePostButton post={post} />
      </div> */}
      </>
      {/* </Card> */}

      {/* <div className="post-comment__container">
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
      </div> */}
    </>
  );
};

export default PostComment;
