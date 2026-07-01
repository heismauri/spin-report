"use client";

import Loader from "@/components/Loader";
import StatsCard from "@/components/StatsCard";
import { getStats as getLastFmStats } from "@/lastFm/getStats";
import { getStats as getStatsFmStats } from "@/statsFm/getStats";
import { TopStats } from "@/types/Stats";
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

const getLastHalfRange = () => {
  const today = new Date();
  const month = today.getMonth();
  if (month < 6) {
    const year = today.getFullYear() - 1;
    return { from: new Date(year, 6, 1, 0, 0, 0), to: new Date(year, 11, 31, 23, 59, 59, 999) };
  }
  const year = today.getFullYear();
  return { from: new Date(year, 0, 1, 0, 0, 0), to: new Date(year, 5, 30, 23, 59, 59, 999) };
};

const getLastYearRange = () => {
  const today = new Date();
  const lastYearStart = new Date(today.getFullYear() - 1, 0, 1, 0, 0, 0);
  const lastYearEnd = new Date(today.getFullYear() - 1, 11, 31, 23, 59, 59, 999);
  return { from: lastYearStart, to: lastYearEnd };
};

const getDateRange = (rangeType: string) => {
  switch (rangeType) {
    case "lastYear":
      return getLastYearRange();
    case "lastHalf":
      return getLastHalfRange();
    case "lastMonth":
      return getLastMonthRange();
    default:
      return getLastWeekRange();
  }
};

const RESTRICTED_RANGES: Record<string, Set<string>> = {
  lastfm: new Set(["lastHalf", "lastYear"]),
  statsfm: new Set(["lastWeek"])
};

const StatsForm = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<TopStats | null>(null);
  const [service, setService] = useState("statsfm");
  const [selectedRange, setSelectedRange] = useState("lastMonth");

  const handleServiceChange = (newService: string) => {
    setService(newService);
    if (RESTRICTED_RANGES[newService]?.has(selectedRange)) {
      setSelectedRange("lastMonth");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const dateRange = getDateRange(selectedRange);
    if (RESTRICTED_RANGES[service]?.has(selectedRange)) {
      return alert(`The selected date range is not available for ${service}. Please choose a different range.`);
    }
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
        alert("Error fetching stats. Please try again. " + error.message);
        setLoading(false);
        console.error("Error fetching stats:", error);
      });
  };

  return (
    <>
      <form className="flex flex-col gap-4 w-full max-w-md text-xl" onSubmit={handleSubmit}>
        <label className="flex flex-col">
          <span className="font-medium text-stone-700 dark:text-stone-300">Username</span>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            className="border border-stone-300 dark:border-stone-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-stone-200 disabled:text-stone-500 dark:disabled:bg-stone-700 dark:disabled:text-stone-500"
            required
            disabled={loading}
          />
        </label>
        <label className="flex flex-col">
          <span className="font-medium text-stone-700 dark:text-stone-300">Service</span>
          <div className="flex flex-row gap-4">
            <label className="flex items-center gap-2 has-[:disabled]:text-stone-400 has-[:disabled]:cursor-not-allowed">
              <input
                type="radio"
                name="service"
                value="statsfm"
                checked={service === "statsfm"}
                onChange={() => handleServiceChange("statsfm")}
                disabled={loading}
                className="accent-purple-500"
              />
              stats.fm
            </label>
            <label className="flex items-center gap-2 has-[:disabled]:text-stone-400 has-[:disabled]:cursor-not-allowed">
              <input
                type="radio"
                name="service"
                value="lastfm"
                checked={service === "lastfm"}
                onChange={() => handleServiceChange("lastfm")}
                disabled={loading}
                className="accent-purple-500"
              />
              Last.fm
            </label>
          </div>
        </label>
        <label className="flex flex-col">
          <span className="font-medium text-stone-700 dark:text-stone-300">Date Range</span>
          <div className="grid grid-cols-3 gap-4">
            <label className="flex items-center gap-2 has-[:disabled]:text-stone-400 has-[:disabled]:cursor-not-allowed">
              <input
                type="radio"
                name="dateRange"
                value="lastWeek"
                checked={selectedRange === "lastWeek"}
                onChange={() => setSelectedRange("lastWeek")}
                disabled={loading || service === "statsfm"}
                className="accent-purple-500"
              />
              Last week
            </label>
            <label className="flex items-center gap-2 has-[:disabled]:text-stone-400 has-[:disabled]:cursor-not-allowed">
              <input
                type="radio"
                name="dateRange"
                value="lastMonth"
                checked={selectedRange === "lastMonth"}
                onChange={() => setSelectedRange("lastMonth")}
                disabled={loading}
                className="accent-purple-500"
              />
              Last month
            </label>
            <label className="flex items-center gap-2 has-[:disabled]:text-stone-400 has-[:disabled]:cursor-not-allowed">
              <input
                type="radio"
                name="dateRange"
                value="lastHalf"
                checked={selectedRange === "lastHalf"}
                onChange={() => setSelectedRange("lastHalf")}
                disabled={loading || service === "lastfm"}
                className="accent-purple-500"
              />
              Last half
            </label>
            <label className="flex items-center gap-2 has-[:disabled]:text-stone-400 has-[:disabled]:cursor-not-allowed">
              <input
                type="radio"
                name="dateRange"
                value="lastYear"
                checked={selectedRange === "lastYear"}
                onChange={() => setSelectedRange("lastYear")}
                disabled={loading || service === "lastfm"}
                className="accent-purple-500"
              />
              Last year
            </label>
          </div>
        </label>
        <button
          type="submit"
          className="bg-purple-500 text-white rounded-md p-2 hover:bg-purple-400 transition not-disabled:cursor-pointer disabled:bg-stone-300 dark:disabled:bg-stone-700 disabled:opacity-70"
          disabled={loading}
        >
          Find out about my spins
        </button>
      </form>
      {loading ? (
        <Loader />
      ) : (
        <>
          {stats && (
            <StatsCard
              albums={stats.albums}
              artists={stats.artists}
              tracks={stats.tracks}
              streams={stats.streams}
              dateRange={stats.dateRange}
              images={stats.images}
            />
          )}
        </>
      )}
    </>
  );
};

export default StatsForm;
