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
    <div className="grid grid-cols-3 gap-4 mx-4">
      {playerStats.map((player) => (
        <div
          key={player.person.id}
          className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center relative"
        >
          <label className="absolute top-2 right-2 inline-flex items-center cursor-pointer">
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
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2"></th>
                  <th className="px-4 py-2">Player Stats Continued</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-medium">Games:</td>
                  <td className="border px-4 py-2">{playerData.games}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">Time on Ice:</td>
                  <td className="border px-4 py-2">{playerData.timeOnIce}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">Goals:</td>
                  <td className="border px-4 py-2">{playerData.goals}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">Assists:</td>
                  <td className="border px-4 py-2">{playerData.assists}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">Points:</td>
                  <td className="border px-4 py-2">{playerData.points}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">Power Play Goals:</td>
                  <td className="border px-4 py-2">{playerData.powerPlayGoals}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">Power Play Points:</td>
                  <td className="border px-4 py-2">{playerData.powerPlayPoints}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">PIM:</td>
                  <td className="border px-4 py-2">{playerData.pim}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">Shots:</td>
                  <td className="border px-4 py-2">{playerData.shots}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">Hits:</td>
                  <td className="border px-4 py-2">{playerData.hits}</td>
                </tr>
              </tbody>
            </table>
            <button onClick={() => setShowModal(false)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
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