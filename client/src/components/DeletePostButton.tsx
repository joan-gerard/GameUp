import { useMutation } from "@apollo/client";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/auth";
import { DELETE_POST } from "../graphql/mutations";
import { GET_POSTS } from "../graphql/queries";

const DeletePostButton: React.FC<DeletePostButtonProps> = ({ post }) => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [deletePost] = useMutation(DELETE_POST, {
    variables: { postId: post.id },
    update() {},

    refetchQueries: [{ query: GET_POSTS }],
  });

  const handleDeletePost = () => {
    console.log(post.id);

    deletePost();
    if (id) {
      navigate("/");
    }
  };

  return (
    <div>
      {user?.username === post.username ? (
        <button className="ml10" onClick={handleDeletePost}>
          <FaTrash />
        </button>
      ) : null}
    </div>
  );
};

export default DeletePostButton;
