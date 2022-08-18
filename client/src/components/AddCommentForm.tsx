import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useAuthContext } from "../context/auth";
import { CREATE_COMMENT } from "../graphql/mutations";

const white = "#FFFFFF";

const AddCommentForm: React.FC<AddCommentFormProps> = ({ id }) => {
  const { user } = useAuthContext();
  const [comment, setComment] = useState("");

  const [createComment] = useMutation(CREATE_COMMENT, {
    update() {
      setComment("");
    },
    variables: { postId: id, body: comment },
  });

  const handleCreateComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createComment();
  };

  return (
    <>
      {user && (
        <form className="comment-form" onSubmit={handleCreateComment}>
          <input
            id="outlined-size-small"
            type="text"
            name="comment"
            className="input-field br-10"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            disabled={comment.trim() === ""}
            className="comment-form__button"
          >
            <span>Post</span>
          </button>
        </form>
      )}
    </>
  );
};

export default AddCommentForm;
