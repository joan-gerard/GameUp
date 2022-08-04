import { useMutation } from "@apollo/client";
import { Button, TextField } from "@mui/material";
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
    console.log(comment);
    createComment();
  };

  return (
    <>
      {user && (
        <form className="align-items add-comment__form"  onSubmit={handleCreateComment}>
          {/* <label>
            Add comment:
            <input
              type="text"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label> */}

          <TextField
            sx={{
              backgroundColor: white,
              borderRadius: '8px',
              marginRight: '10px'
            }}
            label="Comment"
            id="outlined-size-small"
            size="small"
            type="text"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            variant="contained"
            type="submit"
            // disabled={comment.trim() === ""}
          >
            Post comment
          </Button>
        </form>
      )}
    </>
  );
};

export default AddCommentForm;
