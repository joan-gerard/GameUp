import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionGroup } from "react-transition-group";

import { useQuery, gql } from "@apollo/client";
import { GET_POSTS } from "../graphql/queries";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

const Home = () => {
  const { loading, error, data, client } = useQuery(GET_POSTS);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <>
          <PostForm />
          <Box sx={{ mt: 1 }}>
            <List>
              <TransitionGroup>
                {data.getPosts.map((post: any) => (
                  <Collapse key={post.id}>
                    <PostCard key={post.id} post={post} />
                  </Collapse>
                ))}
              </TransitionGroup>
            </List>
          </Box>
          {/* <div>
            {data.getPosts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div> */}
        </>
      )}
    </>
  );
};

export default Home;
