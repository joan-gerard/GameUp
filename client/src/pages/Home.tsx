import React from "react";
import Collapse from "@mui/material/Collapse";
import { TransitionGroup } from "react-transition-group";
import { useQuery } from "@apollo/client";

import { GET_POSTS } from "../graphql/queries";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import Users from "../components/Users";

const primary = "#18132b";

const Home = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Something Went Wrong</p>;

  // const latestPosts = data.getPosts.slice(0, 5);

  return (
    <div>
    {/* <Container maxWidth={false} sx={{ backgroundColor: primary }}> */}
      {/* <Games /> */}
      {!loading && !error && (
        <div className="home-layout">
          <PostForm />
          <div>
            <TransitionGroup>
              {data.getPosts.map((post: any) => (
                <Collapse key={post.id}>
                  <PostCard key={post.id} post={post} />
                </Collapse>
              ))}
            </TransitionGroup>
          </div>
          <Users />
        </div>
      )}
    </div>
  );
};

export default Home;
