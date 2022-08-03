import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";

import { useAuthContext } from "../context/auth";
import { CREATE_POST } from "../graphql/mutations";
import { GET_POSTS } from "../graphql/queries";
import { usePostForm } from "../utils/hooks";

const PostForm = () => {
  const { user } = useAuthContext();
  const [errors, setErrors] = useState<any>("");

  const { values, onChange, onSubmit } = usePostForm(createPostCb, setErrors, {
    body: "",
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
        <>
          <form onSubmit={onSubmit}>
            <label>
              New Post:
              <input
                type="text"
                name="body"
                value={values.body}
                onChange={onChange}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
          {errors && (
            <div>
              <ul>
                <li>{errors}</li>
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PostForm;
