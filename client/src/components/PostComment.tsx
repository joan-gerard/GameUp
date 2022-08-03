import React from "react";
import moment from "moment";
import avatar from "../components/assets/avatar.png";
import { useAuthContext } from "../context/auth";
import { FaTrash } from "react-icons/fa";
import { DELETE_COMMENT } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

// type PostCommentProps = {
//   id: string;
//   body: string;
//   username: string;
//   createdAt: string;
// };

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
      <div className="post-comment__container">
        <div className="post-comment__header">
          <div className="post-comment__user">
            <img src={avatar} className="comment-avatar" />
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
      </div>
    </>
  );
};

export default PostComment;
