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
import { useAuthContext } from "../context/auth";

type Comment = {
  id: string;
  body: string;
  username: string;
  createdAt: string;
};

const PostPage = () => {
  const { id } = useParams();
  const { user } = useAuthContext();

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { postId: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <div className="post-page">
      {!loading && !error && (
        <>
          <div className="post-card">
            <div className="post-card__header">
              <div className="post-card__user">
                {user && (
                  <img
                    className="avatar"
                    src={avatar}
                    // src={!user.profileImageUrl ? avatar : user.profileImageUrl}
                    alt="avatar"
                  />
                )}
                <p className="post__username">@{data.getPost.username}</p>
              </div>
              <p className="post__date">
                {moment(data.getPost.createdAt).fromNow(false)}
              </p>
            </div>
            <div className="post-card__game">
              <img src="https://res.cloudinary.com/dpo5hvd8r/image/upload/v1660819667/my-games/tsztfoiu49xcqlqu6xyq.jpg" alt="game" />
              <div className="game-info">
                <p className="game-title">{data.getPost.game}</p>
                <p className="game-platform">PS5</p>
              </div>
            </div>
            <div className="post-card__body">
              <p>{data.getPost.body}</p>
            </div>
            <div className="post-card__actions">
              <div className="post-card__buttons">
                <LikeButton post={data.getPost} />
                <CommentButton post={data.getPost} />
              </div>
              <DeletePostButton post={data.getPost} />
            </div>
          </div>

          <div className="comment-form__wrapper">
            <AddCommentForm id={id} />
          </div>

          {data.getPost.comments.length > 0 ? (
            <div className="comments-container">
              {data.getPost.comments &&
                data.getPost.comments.map((comment: Comment, i: number) => (
                  <CommentCard key={i} comment={comment} id={id} />
                ))}
            </div>
          ) : (
            <div className="no-comment__message">
              <p>There are no comments yet...</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostPage;
