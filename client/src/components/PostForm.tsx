import { useMutation } from "@apollo/client";
import React, { useState } from "react";

import { CREATE_POST } from "../graphql/mutations";
import { GET_POSTS } from "../graphql/queries";
import { usePostForm } from "../utils/hooks";
import close_icon from "../components/assets/icons8-close.svg";
// import GameListSelect from "./GameListSelect";

const PostForm: React.FC<PostFormProps> = ({ setPostFormIsShowing }) => {
  const [errors, setErrors] = useState<string | null>(null);

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
      setPostFormIsShowing(false);
    },

    onError(err) {
      setErrors(err.graphQLErrors[0].message);
    },
  });
  function createPostCb() {
    createPost();
  }

  if (loading) return <p>Posting...</p>;

  return (
    <div className="post-component">
      {/* {user && ( */}
      <div className="post-form">
        <form onSubmit={onSubmit}>
          <div className="post-form__header">
            <h2 className="h2">Write a post</h2>
            <div onClick={() => setPostFormIsShowing(false)}>
              <img src={close_icon} alt="close icon" />
            </div>
          </div>
          <hr className="hr-style" />

          <div className="post-form__input">
            <input
              id="outlined-basic"
              type="text"
              name="game"
              placeholder="select a game... (optional)"
              className="input-field"
              value={values.game}
              onChange={onChange}
            />
            <textarea
              id="outlined-basic"
              name="body"
              placeholder="write a post..."
              className="input-field post-field"
              style={{ width: "100%" }}
              value={values.body}
              onChange={onChange}
            />
            <div className="post-form__button-wrapper">
              <button
                type="submit"
                className="post-form__button"
                disabled={!values.body}
              >
                Post
              </button>
            </div>
          </div>
          {errors && (
            <div>
              <p className="error-msg">* {errors}</p>
            </div>
          )}
        </form>
      </div>
      {/* )} */}
    </div>
  );
};

export default PostForm;
