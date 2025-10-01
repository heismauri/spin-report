"use client";

import Loader from "@/components/Loader";
import StatsCard from "@/components/StatsCard";
import { getStats as getLastFmStats } from "@/lastFm/getStats";
import { getStats as getStatsFmStats } from "@/statsFm/getStats";
import { useState } from "react";

const getLastWeekRange = () => {
  const today = new Date();
  const lastWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 7, 0, 0, 0);
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

const getLastMonthRange = () => {
  const today = new Date();
  const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfLastMonth = new Date(firstDayOfCurrentMonth.getTime() - 1);
  const firstDayOfLastMonth = new Date(lastDayOfLastMonth.getFullYear(), lastDayOfLastMonth.getMonth(), 1);
  return { from: firstDayOfLastMonth, to: lastDayOfLastMonth };
};

const StatsForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{
    albums: string[];
    artists: { name: string; image?: string }[];
    tracks: string[];
    minutes: number;
    streams: number;
    dateRange: { from: Date; to: Date };
  } | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const service = formData.get("service") as string;
    const dateRange = (formData.get("dateRange") as string) === "lastMonth" ? getLastMonthRange() : getLastWeekRange();
    console.log("Fetching stats for user:", username);
    setStats(null);
    setLoading(true);
    Promise.all([service === "lastfm" ? getLastFmStats(username, dateRange) : getStatsFmStats(username, dateRange)])
      .then(([stats]) => {
        setStats(stats);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((error) => {
        alert("Error fetching stats. Please try again.");
        setLoading(false);
        console.error("Error fetching stats:", error);
      });
  };

  return (
    <>
      <form className="flex flex-col gap-4 w-full max-w-md text-xl" onSubmit={handleSubmit}>
        <label className="flex flex-col">
          <span className="font-medium text-gray-700">Username</span>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:text-gray-100"
            required
            disabled={loading}
          />
        </label>
        <label className="flex flex-col">
          <span className="font-medium text-gray-700">Service</span>
          <div className="flex flex-row gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="service" value="statsfm" defaultChecked />
              stats.fm
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="service" value="lastfm" />
              Last.fm
            </label>
          </div>
        </label>
        <label className="flex flex-col">
          <span className="font-medium text-gray-700">Date Range</span>
          <div className="flex flex-row gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="dateRange" value="lastWeek" defaultChecked />
              Last week
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="dateRange" value="lastMonth" />
              Last month
            </label>
          </div>
        </label>
        <button
          type="submit"
          className="bg-purple-500 text-white rounded-md p-2 hover:bg-purple-400 transition not-disabled:cursor-pointer disabled:bg-gray-300"
          disabled={loading}
        >
          Find out about my spins
        </button>
      </form>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error && <p className="text-red-500">{error}</p>}
          {stats && (
            <StatsCard
              albums={stats.albums}
              artists={stats.artists}
              tracks={stats.tracks}
              minutes={stats.minutes}
              streams={stats.streams}
              dateRange={stats.dateRange}
            />
          )}
        </>
      )}
    </>
  );
};

export default StatsForm;
