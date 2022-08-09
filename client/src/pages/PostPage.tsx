import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

import avatar from "../components/assets/avatar.png";
import CommentButton from "../components/CommentButton";
import DeletePostButton from "../components/DeletePostButton";
import LikeButton from "../components/LikeButton";
import { GET_POST } from "../graphql/queries";
import CommentCard from "../components/CommentCard";
import AddCommentForm from "../components/AddCommentForm";
import { Card } from "@mui/material";

type Comment = {
  id: string;
  body: string;
  username: string;
  createdAt: string;
};

const light = "#322651";
const white = "#FFFFFF";

const PostPage = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { postId: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong</p>;
  
  return (
    <div>
      {!loading && !error && (
        <>
          <Card
            sx={{
              backgroundColor: light,
              margin: "0 150px",
              marginTop: "15px",
              marginBottom: "10px",
              padding: 2,
              borderRadius: "16px",
              color: white,
            }}
          >
            <div className="jc-between">
              <div className="post__user-info">
                <img className="avatar" src={avatar} alt="avatar" />
                <div className="post__username">
                  <p className="">{data.getPost.username}</p>
                  <p className="moment-date">
                    {moment(data.getPost.createdAt).fromNow(false)}
                  </p>
                </div>
              </div>
              <p className="post__game-title">{data.getPost.game}</p>
            </div>
            <div className="post-body">
              <p>{data.getPost.body}</p>
            </div>

            <hr className="hr-thin" />

            <div className="post_action-container">
              <div className="post_action-buttons">
                <LikeButton post={data.getPost} />
                <CommentButton post={data.getPost} />
              </div>
              <DeletePostButton post={data.getPost} />
            </div>
          </Card>
          <Card
            sx={{
              backgroundColor: white,
              margin: "0 150px",
              marginTop: "15px",
              marginBottom: "10px",
              padding: 2,
              borderRadius: "16px",
              color: white,
            }}
          >
            <AddCommentForm id={id} />
          </Card>

          {data.getPost.comments.length > 0 ? (
            <Card
              sx={{
                backgroundColor: light,
                margin: "0 150px",
                marginTop: "15px",
                marginBottom: "10px",
                padding: 2,
                borderRadius: "16px",
                color: white,
              }}
            >
              {data.getPost.comments &&
                data.getPost.comments.map((comment: Comment, i: number) => (
                  <CommentCard key={i} comment={comment} id={id} />
                ))}
            </Card>
          ) : (
            <Card
              sx={{
                backgroundColor: light,
                margin: "0 150px",
                marginTop: "15px",
                marginBottom: "10px",
                padding: 2,
                borderRadius: "16px",
                color: white,
              }}
            >
              <p>There are no comments yet...</p>
            </Card>
          )}
        </>

        // <div className="postCard">
        //   <div className="row jc-between bg-primary p2">
        //     <div className="column jc-between">
        //       <p className="m0">{data.getPost.username}</p>
        //       <p className="m0 moment-date">
        //         {moment(data.getPost.createdAt).fromNow(false)}
        //       </p>
        //     </div>

        //     <img src={avatar} alt="avatar" />
        //   </div>
        //   <p>{data.getPost.body}</p>
        //   <hr />

        //   <div className="action-container jc-between">
        //     <div className="row align-center ">
        //       <div className="row align-center">
        //         <p className="">{data.getPost.likeCount}</p>
        //         <LikeButton post={data.getPost} />
        //       </div>
        //       <CommentButton post={data.getPost} />
        //     </div>
        //     <DeletePostButton post={data.getPost} />
        //   </div>
        // </div>
      )}
    </div>
  );
};

export default PostPage;
