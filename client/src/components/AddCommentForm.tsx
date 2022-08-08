import { useMutation } from "@apollo/client";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useAuthContext } from "../context/auth";
import { CREATE_COMMENT } from "../graphql/mutations";

const white = "#FFFFFF";

// type commentInputRefType = {
//   commentInputRef: null | JSX.Element;
// };

const AddCommentForm: React.FC<AddCommentFormProps> = ({ id }) => {
  const { user } = useAuthContext();
  const [comment, setComment] = useState("");
  // const [isFocused, setFocus] = useState(false);
  // const commentInputRef = useRef<any>(null);

  const [createComment] = useMutation(CREATE_COMMENT, {
    update() {
      setComment("");
      // setInputFocus(false);
    },
    variables: { postId: id, body: comment },
  });

  const handleCreateComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(comment);
    createComment();
  };

  // const setInputFocus = (state: boolean) => {
  //   const notEmpty = !!commentInputRef.current?.value;

  //   if (notEmpty) return setFocus(true);

  //   setFocus(state);
  // };

  return (
    <>
      {user && (
        <form
          className="align-items add-comment__form"
          onSubmit={handleCreateComment}
        >
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
              borderRadius: "8px",
              marginRight: "10px",
            }}
            label="Comment"
            id="outlined-size-small"
            size="small"
            type="text"
            name="comment"
            value={comment}
            // InputLabelProps={{ shrink: isFocused }}
            // onFocus={() => setInputFocus(true)}
            // onBlur={() => setInputFocus(false)}
            // ref={commentInputRef}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            variant="contained"
            type="submit"
            disabled={comment.trim() === ""}
          >
            Post comment
          </Button>
        </form>
      )}
    </>
  );
};

export default AddCommentForm;
