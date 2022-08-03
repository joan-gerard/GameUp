import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

import avatar from "../components/assets/avatar.png";
import CommentButton from "../components/CommentButton";
import DeletePostButton from "../components/DeletePostButton";
import LikeButton from "../components/LikeButton";
import PostCard from "../components/PostCard";
import { GET_POST } from "../graphql/queries";
import PostComment from "../components/PostComment";
import AddCommentForm from "../components/AddCommentForm";

type Comment = {
  id: string;
  body: string;
  username: string;
  createdAt: string;
};
const PostPage = () => {
  const { id } = useParams();

  const { loading, error, data, client } = useQuery(GET_POST, {
    variables: { postId: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <div>
      {!loading && !error && (
        <>
          <div className="postCard">
            <div className="row jc-between bg-primary p2">
              <div className="column jc-between">
                <p className="m0">{data.getPost.username}</p>
                <p className="m0 moment-date">
                  {moment(data.getPost.createdAt).fromNow(false)}
                </p>
              </div>

              <img src={avatar} />
            </div>
            <p>{data.getPost.body}</p>
            <hr />

            <div className="action-container jc-between">
              <div className="row align-center ">
                <div className="row align-center">
                  <p className="">{data.getPost.likeCount}</p>
                  <LikeButton post={data.getPost} />
                </div>
                <CommentButton post={data.getPost} />
              </div>
              <DeletePostButton post={data.getPost} />
            </div>
            <hr />
          </div>
          <AddCommentForm id={id} />
          <>
            {data.getPost.comments &&
              data.getPost.comments.map((comment: Comment, i: number) => (
                <PostComment key={i} comment={comment} id={id} />
              ))}
          </>
        </>
      )}
    </div>
  );
};

export default PostPage;
