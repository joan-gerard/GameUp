import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const PostPage = () => {
  return (
    <div>
      <Link to="/" className="btn 2-25 px-2 py-1 btn-white">
        <FaArrowLeft />
      </Link>
      <div>
        <p>Post here</p>
      </div>
    </div>
  );
};

export default PostPage;
