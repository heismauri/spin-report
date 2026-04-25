import {
  ExtendedAlbum,
  ExtendedArtist,
  Track,
  TrackInfo,
  WeeklyAlbum,
  WeeklyArtist,
  WeeklyTrack
} from "@/types/lastFmResponses";

const getTopAlbums = async (username: string, range: { from: Date; to: Date }): Promise<ExtendedAlbum[]> => {
  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.searchParams.set("method", "user.getweeklyalbumchart");
  url.searchParams.set("api_key", process.env.NEXT_PUBLIC_LASTFM_API_KEY || "");
  url.searchParams.set("format", "json");
  url.searchParams.set("user", username);
  url.searchParams.set("from", Math.floor(range.from.getTime() / 1000).toString());
  url.searchParams.set("to", Math.floor(range.to.getTime() / 1000).toString());
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Error fetching top albums: ${await response.text()}`);
  }
  const data: WeeklyAlbum = await response.json();
  return data.weeklyalbumchart.album;
};

const getTopArtists = async (username: string, range: { from: Date; to: Date }): Promise<ExtendedArtist[]> => {
  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.searchParams.set("method", "user.getweeklyartistchart");
  url.searchParams.set("api_key", process.env.NEXT_PUBLIC_LASTFM_API_KEY || "");
  url.searchParams.set("format", "json");
  url.searchParams.set("user", username);
  url.searchParams.set("from", Math.floor(range.from.getTime() / 1000).toString());
  url.searchParams.set("to", Math.floor(range.to.getTime() / 1000).toString());
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Error fetching top artists: ${await response.text()}`);
  }
  const data: WeeklyArtist = await response.json();
  return data.weeklyartistchart.artist;
};

const getTopTracks = async (username: string, range: { from: Date; to: Date }): Promise<Track[]> => {
  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.searchParams.set("method", "user.getweeklytrackchart");
  url.searchParams.set("api_key", process.env.NEXT_PUBLIC_LASTFM_API_KEY || "");
  url.searchParams.set("format", "json");
  url.searchParams.set("user", username);
  url.searchParams.set("from", Math.floor(range.from.getTime() / 1000).toString());
  url.searchParams.set("to", Math.floor(range.to.getTime() / 1000).toString());
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Error fetching top tracks: ${await response.text()}`);
  }
  const data: WeeklyTrack = await response.json();
  return data.weeklytrackchart.track;
};

const getTrackInfo = async (username: string, artist: string, track: string): Promise<TrackInfo> => {
  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.searchParams.set("method", "track.getinfo");
  url.searchParams.set("api_key", process.env.NEXT_PUBLIC_LASTFM_API_KEY || "");
  url.searchParams.set("format", "json");
  url.searchParams.set("user", username);
  url.searchParams.set("artist", artist);
  url.searchParams.set("track", track);
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Error fetching track info: ${await response.text()}`);
  }
  const data: TrackInfo = await response.json();
  return data;
};

export { getTopAlbums, getTopArtists, getTopTracks, getTrackInfo };
