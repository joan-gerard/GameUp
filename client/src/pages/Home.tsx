import React from "react";
import Collapse from "@mui/material/Collapse";
import { TransitionGroup } from "react-transition-group";
import { Container } from "@mui/material";
import { useQuery } from "@apollo/client";

import { GET_POSTS } from "../graphql/queries";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

const bg800 = "#880e4f";

const primary = "#18132b";
const white = "#FFFFF";

const Home = () => {
  const { loading, error, data, client } = useQuery(GET_POSTS);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Something Went Wrong</p>;

  const latestPosts = data.getPosts.slice(0, 5);
  console.log(latestPosts);

  return (
    <Container maxWidth={false} sx={{ backgroundColor: primary }}>
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
        </div>
      )}
    </Container>
  );
};

export default Home;
