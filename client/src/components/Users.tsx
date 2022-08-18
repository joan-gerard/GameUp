import { useQuery } from "@apollo/client";
import React from "react";
import { useAuthContext } from "../context/auth";
import { GET_POSTS } from "../graphql/queries";
import avatar from "./assets/avatar.png";

const Users = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  const { user } = useAuthContext();

  const users = data.getPosts.map((post: any) => post.username);
  const uniqueUsers = [...new Set(users)];

  const otherUsers = uniqueUsers.filter(
    (uniqueUser) => uniqueUser !== user?.username
  );

  const shuffle = (array: any) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };
  // useEffect(() => {
  //   shuffle(otherUsers);
  // }, [user?.username]);


  const firstFourUsers = otherUsers.slice(0, 4);

  return (
    <>
      {!loading && !error && (
        <div className="user-list">
          <h2 className="h2">WHO TO FOLLOW</h2>
          {firstFourUsers.map((user: any, i) => (
            <div key={i} className="user-list__row">
              <div className="user-list__info">
                <img className="" src={avatar} alt="avatar" />
                <p>{user}</p>
              </div>
              <button className="follow-button">Follow</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Users;
