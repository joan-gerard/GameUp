import { useMutation } from "@apollo/client";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

import { useAuthContext } from "../context/auth";
import { CREATE_POST } from "../graphql/mutations";
import { GET_POSTS } from "../graphql/queries";
import { usePostForm } from "../utils/hooks";
// import GameListSelect from "./GameListSelect";

const PostForm = () => {
  const { user } = useAuthContext();
  const [errors, setErrors] = useState<string>("");

  const { values, onChange, onSubmit } = usePostForm(createPostCb, setErrors, {
    body: "",
    game: "",
  });

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery<GET_POSTS_readQuery>({
        query: GET_POSTS,
      });

      if (data !== null) {
        // below: avoid array mutation - create new array instead
        const updatedPosts = [result.data.createPost, ...data.getPosts];
        proxy.writeQuery({
          query: GET_POSTS,
          data: { getPosts: updatedPosts },
        });
        values.body = "";
      }
    },

    onError(err) {
      setErrors(err.graphQLErrors[0].message);
    },
  });

  function createPostCb() {
    createPost();
  }

  console.log('postform errors', typeof errors)

  if (loading) return <p>Posting...</p>;

  return (
    <>
      {user && (
        <div className="post-form">
          <form onSubmit={onSubmit}>
            <h2>Write a post</h2>
            <div className="post-form__input">
              <TextField
                sx={{
                  marginBottom: 2,
                }}
                id="outlined-basic"
                label="Message*"
                variant="outlined"
                size="medium"
                type="text"
                name="body"
                value={values.body}
                onChange={onChange}
              />
              {/* <GameListSelect /> */}
              <TextField
                sx={{
                  marginBottom: 2,
                }}
                id="outlined-basic"
                label="Game"
                variant="outlined"
                size="medium"
                type="text"
                name="game"
                value={values.game}
                onChange={onChange}
              />
              {/* <FormControl sx={{ marginBottom: 2 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Age
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl> */}
              <Button variant="contained" color="success" type="submit">
                Post
              </Button>
            </div>
            {errors && (
              <div>
                <p className="error-msg">* {errors}</p>
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default PostForm;
