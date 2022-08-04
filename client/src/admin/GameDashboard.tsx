import { useQuery } from "@apollo/client";
import React from "react";
import { GET_GAMES, GET_PLATFORMS } from "../graphql/queries";

import games from "./games";

const GameDashboard = () => {
  const {
    loading: platformLoading,
    data: platformData,
    error: platformError,
  } = useQuery(GET_PLATFORMS);
  const {
    loading: gameLoading,
    data: gameData,
    error: gameError,
  } = useQuery(GET_GAMES);

  return (
    <div>
      <div>
        {!platformLoading && !platformError && (
          <>
            <p>Platforms</p>
            <ul>
              {platformData.getPlatforms.map((plaform: any, i: number) => (
                <li key={i}>{plaform.name}</li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div>
        {!gameLoading && !gameError && (
          <>
            <p>Games</p>
            <ul>
              {gameData.getGames.map((game: any, i: number) => (
                <li key={i}>{game.name}</li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="image-container">
        <img alt="game_cover" src={games.diablo} />
        <img alt="game_cover" src={games.elden_ring} />
        <img alt="game_cover" src={games.fall_guys} />
        <img alt="game_cover" src={games.fortnite} />
        <img alt="game_cover" src={games.minecraft} />
        <img alt="game_cover" src={games.call_of_Duty_Warzone} />
        <img alt="game_cover" src={games.monster_Hunter_World} />
        <img alt="game_cover" src={games.destiny_2} />
        <img alt="game_cover" src={games.apex_legends} />
      </div>
    </div>
  );
};

export default GameDashboard;
