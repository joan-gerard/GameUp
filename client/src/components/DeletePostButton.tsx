import { useMutation } from "@apollo/client";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { useAuthContext } from "../context/auth";
import { DELETE_POST } from "../graphql/mutations";

const DeletePostButton: React.FC<DeletePostButtonProps> = ({ post }) => {
  const { user } = useAuthContext();

//   const [deletePost] = useMutation(DELETE_POST, {
//     variables: { post.id },
//     update(cache, { data: { deleteTask } }) {
//       const { tasks } = cache.readQuery({ query: GET_TASKS }) || {};
//       cache.writeQuery({
//         query: GET_TASKS,
//         data: {
//           tasks: tasks?.filter((task: ITask) => task._id !== deleteTask._id),
//         },
//       });
//     },
//   });


  const handleDeletePost = () => {
      console.log('delete post')
  }

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
