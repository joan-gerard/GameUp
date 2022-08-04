import React from "react";
import games from "../admin/games";

console.log(games);

const Games = () => {
  return (
    <div className="image-container">
      <img src={games.diablo} />
      <img src={games.elden_ring} />
      <img src={games.fall_guys} />
      <img src={games.fortnite} />
      <img src={games.minecraft} />
      <img src={games.call_of_Duty_Warzone} />
      <img src={games.monster_Hunter_World} />
      <img src={games.destiny_2} />
      <img src={games.apex_legends} />
    </div>
  );
};

export default Games;
