import { useQuery } from "@apollo/client";
import React from "react";
import { GET_GAMES, GET_PLATFORMS } from "../graphql/queries";

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

  console.log(gameData);

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
    </div>
  );
};

export default GameDashboard;
