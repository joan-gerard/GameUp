import React, { useState } from "react";
import { FaPencilAlt, FaUserFriends } from "react-icons/fa";
import {
  IoGameControllerOutline,
  IoLogoFacebook,
  IoLogoSteam,
  IoLogoTwitch,
  IoLogoTwitter,
  IoStarOutline,
} from "react-icons/io5";

import { useAuthContext } from "../context/auth";
import { UrlExists } from "../utils/helpers";
import avatar from "../components/assets/avatar.png";
import banner from "../components/assets/blog-1.jpg";
import UserGames from "../components/userActivities/UserGames";
import UserFriends from "../components/userActivities/UserFriends";
import UserWishlist from "../components/userActivities/UserWishlist";
import UserPosts from "../components/userActivities/UserPosts";

const UserProfile = () => {
  const { user } = useAuthContext();

  const [showView, setShowView] = useState<string>("games");

  const activityView = () => {
    if (showView === "games") return <UserGames />;
    if (showView === "friends") return <UserFriends />;
    if (showView === "posts") return <UserPosts />;
    if (showView === "wishlist") return <UserWishlist />;
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-picture">
          <img
            alt="profile"
            src={
              !user?.profileImageUrl
                ? avatar
                : UrlExists(user.profileImageUrl) !== 404
                ? user.profileImageUrl
                : avatar
            }
          />
          {/* <button onClick={() => setShowAboutMe(!showAboutMe)}>About me</button>
          {showAboutMe && <h2 className="collapsible">This is about me</h2>}
          <button onClick={() => setShowMyGames(!showMyGames)}>My games</button>
          {showMyGames && <h2 className="collapsible">These are my games</h2>}

          <button onClick={() => setShowMyPosts(!showMyPosts)}>My posts</button>
          {showMyPosts && <h2 className="collapsible">These are my posts</h2>} */}
        </div>
        <div className="profile-banner">
          <img src={banner} alt="banner" />
        </div>
        <div className="profile-content">
          <div className="user-info">
            <h4 className="username">@{user?.username}</h4>
            <ul className="follow-counts">
              <li>
                <h4 className="h4">0</h4>
                <p>Followers</p>
              </li>
              <li>
                <h4 className="h4">0</h4>
                <p>Following</p>
              </li>
            </ul>
            <div className="socials">
              <a href="#">
                <div className="steam social-logo">
                  <IoLogoSteam />
                </div>
              </a>
              <a href="#">
                <div className="twitch social-logo">
                  <IoLogoTwitch />
                </div>
              </a>
              <a href="#">
                <div className="twitter social-logo">
                  <IoLogoTwitter />
                </div>
              </a>
              <a href="#">
                <div className="facebook social-logo">
                  <IoLogoFacebook />
                </div>
              </a>
            </div>
          </div>
          <div className="activities">
            <div className="user-activities__counts">
              <div
                className="user-activities__counts__item"
                onClick={() => setShowView("games")}
              >
                <IoGameControllerOutline />
                <p>0</p>
              </div>
              <div
                className="user-activities__counts__item"
                onClick={() => setShowView("wishlist")}
              >
                <IoStarOutline />
                <p>0</p>
              </div>
              <div
                className="user-activities__counts__item"
                onClick={() => setShowView("posts")}
              >
                <FaPencilAlt />
                <p>0</p>
              </div>
              <div
                className="user-activities__counts__item"
                onClick={() => setShowView("friends")}
              >
                <FaUserFriends />
                <p>0</p>
              </div>
            </div>
            <div className="user-activities__details">{activityView()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
