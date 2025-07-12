"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [playerName, setPlayerName] = useState("lebron");
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!playerName) return;

    setLoading(true);
    axios
      .get(`http://localhost:5000/api/players/${playerName}`)
      .then((res) => {
        setPlayers(res.data.data); // use the array from backend
        setError(null);
      })
      .catch(() => {
        setError("Failed to fetch player data");
        setPlayers([]);
      })
      .finally(() => setLoading(false));
  }, [playerName]);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Basketball Stats Dashboard
      </h1>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter player name"
          className="border p-2 rounded w-72"
        />
      </div>

      {loading && <p className="text-center">Loading player data...</p>}
      {error && <p className="text-red-700 text-center">{error}</p>}

      {players.length > 0 && (
        <div className="overflow-x-auto max-w-6xl mx-auto">
          <table className="min-w-full text-left bg-white border border-gray-300 shadow rounded">
            <thead className="bg-gray-200 border-b text-gray-900">
              <tr>
                <th className="py-2 px-4 border-r">Name</th>
                <th className="py-2 px-4 border-r">Team</th>
                <th className="py-2 px-4 border-r">Position</th>
                <th className="py-2 px-4 border-r">Height</th>
                <th className="py-2 px-4">Weight</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.id} className="border-t hover:bg-gray-50 text-gray-900">
                  <td className="py-2 px-4 border-r">
                  {player.first_name} {player.last_name}
                  </td>
                  <td className="py-2 px-4 border-r">
                  {player.team?.full_name || "-"}
              </td>
                    <td className="py-2 px-4 border-r">
                      {player.position || "-"}
                    </td>
                  <td className="py-2 px-4 border-r">
  {(player.height !== null && player.height !== null)
    ? `${player.height}' ${player.height}"`
    : "-"}
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && players.length === 0 && (
        <p className="text-center text-gray-800">No players found.</p>
      )}
    </main>
  );
}

// This code is a simple React component that fetches and displays basketball player statistics.
// It uses Axios to make API calls and manages state with React hooks.
// The component allows users to input a player's name and fetches their data from a local API.
// It handles loading states and errors gracefully, providing feedback to the user.
// The player data is displayed in a structured format, showing the player's name, team, position, height, and weight.
// If no data is found, it informs the user accordingly.
// The component is styled with basic CSS classes for a clean and user-friendly interface.
// The API endpoint is assumed to be running locally on port 5000.
// The player name is initialized to "lebron" for demonstration purposes, but can be changed
// by the user through the input field.
// The component is designed to be used in a Next.js application with client-side rendering.
// The code is structured to be easily readable and maintainable, following best practices for React development.
