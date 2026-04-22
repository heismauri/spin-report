import { RecentTracks, TrackInfo, WeeklyAlbum, WeeklyArtist, WeeklyTrack } from "@/types/lastFmResponses";

const getRecentTracks = async (username: string, range: { from: Date; to: Date }): Promise<RecentTracks> => {
  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.searchParams.set("method", "user.getrecenttracks");
  url.searchParams.set("user", username);
  url.searchParams.set("api_key", process.env.NEXT_PUBLIC_LASTFM_API_KEY || "");
  url.searchParams.set("format", "json");
  url.searchParams.set("from", Math.floor(range.from.getTime() / 1000).toString());
  url.searchParams.set("to", Math.floor(range.to.getTime() / 1000).toString());
  url.searchParams.set("limit", "1000");
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Error fetching recent tracks: ${await response.text()}`);
  }
  const data: RecentTracks = await response.json();
  console.log(data);
  return data;
};

const getTopAlbums = async (username: string, range: { from: Date; to: Date }, limit = 5): Promise<WeeklyAlbum> => {
  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.searchParams.set("method", "user.getweeklyalbumchart");
  url.searchParams.set("user", username);
  url.searchParams.set("api_key", process.env.NEXT_PUBLIC_LASTFM_API_KEY || "");
  url.searchParams.set("format", "json");
  url.searchParams.set("from", Math.floor(range.from.getTime() / 1000).toString());
  url.searchParams.set("to", Math.floor(range.to.getTime() / 1000).toString());
  url.searchParams.set("limit", limit.toString());
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Error fetching top albums: ${await response.text()}`);
  }
  const data: WeeklyAlbum = await response.json();
  return data;
};

const getTopArtists = async (username: string, range: { from: Date; to: Date }, limit = 5): Promise<WeeklyArtist> => {
  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.searchParams.set("method", "user.getweeklyartistchart");
  url.searchParams.set("user", username);
  url.searchParams.set("api_key", process.env.NEXT_PUBLIC_LASTFM_API_KEY || "");
  url.searchParams.set("format", "json");
  url.searchParams.set("from", Math.floor(range.from.getTime() / 1000).toString());
  url.searchParams.set("to", Math.floor(range.to.getTime() / 1000).toString());
  url.searchParams.set("limit", limit.toString());
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Error fetching top artists: ${await response.text()}`);
  }
  const data: WeeklyArtist = await response.json();
  return data;
};

const getTopTracks = async (username: string, range: { from: Date; to: Date }, limit = 5): Promise<WeeklyTrack> => {
  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.searchParams.set("method", "user.getweeklytrackchart");
  url.searchParams.set("user", username);
  url.searchParams.set("api_key", process.env.NEXT_PUBLIC_LASTFM_API_KEY || "");
  url.searchParams.set("format", "json");
  url.searchParams.set("from", Math.floor(range.from.getTime() / 1000).toString());
  url.searchParams.set("to", Math.floor(range.to.getTime() / 1000).toString());
  url.searchParams.set("limit", limit.toString());
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Error fetching top tracks: ${await response.text()}`);
  }
  const data: WeeklyTrack = await response.json();
  return data;
};

const getTrackInfo = async (username: string, artist: string, track: string): Promise<TrackInfo> => {
  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.searchParams.set("method", "track.getinfo");
  url.searchParams.set("user", username);
  url.searchParams.set("artist", artist);
  url.searchParams.set("track", track);
  url.searchParams.set("api_key", process.env.NEXT_PUBLIC_LASTFM_API_KEY || "");
  url.searchParams.set("format", "json");
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Error fetching track info: ${await response.text()}`);
  }
  const data: TrackInfo = await response.json();
  return data;
};

export { getRecentTracks, getTopAlbums, getTopArtists, getTopTracks, getTrackInfo };
