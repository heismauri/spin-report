"use client";

import { getTopAlbums, getTopArtists, getTopTracks, getStreams } from "@/services/statsFm";
import { Albums, Artists, Streams, Tracks } from "@/types/statsFmResponses";
import { useState } from "react";
import StatsCard from "./StatsCard";

const getLastWeekRange = () => {
  const today = new Date();
  const lastWeekStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() - 7,
    0,
    0,
    0
  );
  const lastWeekEnd = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() - 1,
    23,
    59,
    59,
    999
  );
  return { from: lastWeekStart, to: lastWeekEnd };
};


const StatsForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [albums, setAlbums] = useState<Albums | null>(null);
  const [artists, setArtists] = useState<Artists | null>(null);
  const [tracks, setTracks] = useState<Tracks | null>(null);
  const [streams, setStreams] = useState<Streams | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    console.log("Fetching stats for user:", username);
    setLoading(true);
    Promise.all([
      getTopAlbums(username as string, getLastWeekRange()),
      getTopArtists(username as string, getLastWeekRange()),
      getTopTracks(username as string, getLastWeekRange()),
      getStreams(username as string, getLastWeekRange()),
    ])
      .then(([albums, artists, tracks, streams]) => {
        setAlbums(albums);
        setArtists(artists);
        setTracks(tracks);
        setStreams(streams);
        setLoading(false);
        setError(null);
        console.log("Top Albums:", albums);
        console.log("Top Artists:", artists);
        console.log("Top Tracks:", tracks);
        console.log("Streams:", streams);
      })
      .catch((error) => {
        console.error("Error fetching stats:", error);
      });
  };

  return (
    <>
    <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleSubmit}>
      <label className="flex flex-col gap-2">
        <span className="font-medium text-gray-700">Stats.fm Username</span>
        <input
          type="text"
          name="username"
          placeholder="Enter your stats.fm username"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition"
      >
        Fetch Stats
      </button>
    </form>
    {loading && <p>Loading...</p>}
    {error && <p className="text-red-500">{error}</p>}
    {albums && artists && tracks && streams && (
      <StatsCard albums={albums} artists={artists} tracks={tracks} streams={streams} weekRange={getLastWeekRange()} />
    )}
  </>
  );
};

export default StatsForm;
