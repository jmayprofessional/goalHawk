import React, { useState, useEffect } from "react";
import axios from "axios";

function PlayerStats() {
  const [playerStats, setPlayerStats] = useState([]);
  const [playerData, setPlayerData] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]); // state that manages selected players

  const handleClick = (id) => {
    setPlayerId(id);
    setShowModal(true);
  };

  useEffect(() => {
    axios
      .get("https://statsapi.web.nhl.com/api/v1/teams/3/roster")
      .then((response) => {
        setPlayerStats(response.data.roster);
        setPlayerId(response.data.roster[0].person.id);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (playerId) {
      axios
        .get(`https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats?stats=statsSingleSeason`)
        .then((response) => {
          setPlayerData(response.data.stats[0].splits[0].stat);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [playerId]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {playerStats.map((player) => (
        <div
          key={player.person.id}
          className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center relative"
        >
          <label className="absolute top-0 right-0 inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={selectedPlayers.includes(player.person.id)}
              onChange={() => {
                if (selectedPlayers.includes(player.person.id)) {
                  setSelectedPlayers(selectedPlayers.filter((id) => id !== player.person.id));
                } else {
                  setSelectedPlayers([...selectedPlayers, player.person.id]);
                }
              }}
            />
          </label>
          <img
            className="w-32 h-32 object-cover"
            src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${player.person.id}.jpg`}
            alt={player.person.fullName}
          />
          <h2 className="text-lg font-bold my-2">{player.person.fullName}</h2>
          <p className="text-gray-500">{player.position.name}</p>
          <button 
            onClick={() => handleClick(player.person.id)} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Show more player stats
          </button>
      </div>
      ))}
      {playerData && (
        <div className={`fixed inset-0 ${showModal ? "" : "hidden"}`}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ul>
                <h2>Game Stats</h2>
                <li>Games: {playerData.games}</li>
                <li>Time on Ice: {playerData.timeOnIce}</li>
                <li>Goals: {playerData.goals}</li>
                <li>Assists: {playerData.assists}</li>
                <li>Points: {playerData.points}</li>
                <h2> Power Play Stats:</h2>
                <li>Power Play Goals: {playerData.powerPlayGoals}</li>
                <li>Power Play Points: {playerData.powerPlayPoints}</li>
                <h2>Other On Ice Stats:</h2>
                <li>PIM: {playerData.pim}</li>
                <li>Shots: {playerData.shots}</li>
                <li>Hits: {playerData.hits}</li>
              </ul>
              <button onClick={() => setShowModal(false)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default PlayerStats;