import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { useAuthContext } from "../context/auth";
import { LIKE_POST } from "../graphql/mutations";

const LikeButton: React.FC<LikeButtonProps> = ({ post }) => {
  const { user } = useAuthContext();
  const [liked, setLiked] = useState(false);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: post.id },
  });

  useEffect(() => {
    if (
      user &&
      post.likes.find((like: any) => like.username === user.username)
    ) {
      setLiked(true);
    } else setLiked(false);
  }, [user, post.likes]);

  const handleLikePost = () => {
    likePost();
  };

  return (
    <div className="like-actions">
      <p className="">{post.likeCount}</p>
      <div onClick={handleLikePost} className={liked ? "button-liked" : ""}>
        {liked ? <FaHeart /> : <FaRegHeart />}
      </div>
    </div>
  );
};

export default LikeButton;
