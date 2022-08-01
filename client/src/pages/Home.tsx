import React from "react";
import { useQuery, gql } from "@apollo/client";
import { GET_POSTS } from "../graphql/queries";
import PostCard from "../components/PostCard";

const Home = () => {
  const { loading, error, data, client } = useQuery(GET_POSTS);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div>
          {data.getPosts.map((post: any) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
