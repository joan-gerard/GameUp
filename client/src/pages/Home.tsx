import React, { useState } from "react";
import Collapse from "@mui/material/Collapse";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useQuery } from "@apollo/client";

import { GET_POSTS } from "../graphql/queries";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import Users from "../components/Users";
import { useAuthContext } from "../context/auth";
import avatar from "../components/assets/avatar.png";
import { UrlExists } from "../utils/helpers";

const Home = () => {
  const { user } = useAuthContext();

  const { loading, error, data } = useQuery(GET_POSTS);

  const [postFormIsShowing, setPostFormIsShowing] = useState<boolean>(false);

  const handleShowForm = () => {
    setPostFormIsShowing(!postFormIsShowing);
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Something Went Wrong</p>;

  // const latestPosts = data.getPosts.slice(0, 5);
  console.log('Home')


  return (
    <>
      {!loading && !error && (
        <div className="home-layout">
          <div className="start-post">
            <img
              alt="profile"
              src={
                !user?.profileImageUrl
                  ? avatar
                  : UrlExists(user.profileImageUrl) !== 404
                  ? user.profileImageUrl
                  : avatar
              }
            />

            <div onClick={handleShowForm} className="fake-input">
              <p>Start a post</p>
            </div>
          </div>
          {postFormIsShowing && (
            <PostForm setPostFormIsShowing={setPostFormIsShowing} />
          )}
          <TransitionGroup>
            {data.getPosts.map((post: any, id: number) => (
              <Collapse key={post.id}>
                <PostCard key={post.id} post={post} />
              </Collapse>
            ))}
          </TransitionGroup>
          <Users />
        </div>
      )}
    </>
  );
};

export default Home;
