import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

import { useAuthContext } from "../context/auth";
import { CREATE_POST } from "../graphql/mutations";
import { GET_POSTS } from "../graphql/queries";
import { usePostForm } from "../utils/hooks";
import GameListSelect from "./GameListSelect";

const PostForm = () => {
  const { user } = useAuthContext();
  const [errors, setErrors] = useState<any>("");
  const [gameState, setGameState] = React.useState([]);

  const { values, onChange, onSubmit } = usePostForm(createPostCb, setErrors, {
    body: "",
    game: "",
  });
  // const { loading, data } = useQuery(GET_POSTS);

  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    variables: values,

    // update(proxy, result) {
    //   const data = proxy.readQuery({
    //     query: GET_POSTS,
    //   });
    //   console.log("proxy", data);
    //   console.log("result", result);
    //   // @ts-ignore
    //   data.getPosts = [...data.getPosts, result.data.createPost];
    //   // @ts-ignore
    //   console.log("data.getPosts", data.getPosts);
    //   proxy.writeQuery({ query: GET_POSTS, data });
    //   values.body = "";
    // },

    // update(cache, { data: { createPost } }) {
    //   const { posts } = cache.readQuery({ query: GET_POSTS }) || {};
    //   console.log("update cache", posts);
    //   cache.writeQuery({
    //     query: GET_POSTS,
    //     data: { posts: [...(posts || []), createPost] },
    //   });
    // },
    onError(err) {
      setErrors(err.graphQLErrors[0].message);
    },
    refetchQueries: [{ query: GET_POSTS }], // not recommended to avoid too many queries
  });

  function createPostCb() {
    createPost();
  }

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
          </form>
          {errors && (
            <div>
              <p className="error-msg">* {errors}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PostForm;
