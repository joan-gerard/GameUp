import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useAuthContext } from "../context/auth";
import { CREATE_COMMENT } from "../graphql/mutations";

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
    e.preventDefault()
    console.log(comment);
    createComment();
  };

  return (
    <>
      {user && (
        <form onSubmit={handleCreateComment}>
          <label>
            Add comment:
            <input
              type="text"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label>
          <button type="submit" disabled={comment.trim() === ""}>
            Submit
          </button>
        </form>
      )}
    </>
  );
};

export default AddCommentForm;
