import {
  ExtendedAlbum,
  ExtendedArtist,
  RecentTracks,
  Track,
  TrackInfo,
  WeeklyAlbum,
  WeeklyArtist,
  WeeklyTrack
} from "@/types/lastFmResponses";

const getRecentTracks = async (username: string, range: { from: Date; to: Date }, page = 1): Promise<Track[]> => {
  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.searchParams.set("method", "user.getrecenttracks");
  url.searchParams.set("api_key", process.env.NEXT_PUBLIC_LASTFM_API_KEY || "");
  url.searchParams.set("format", "json");
  url.searchParams.set("user", username);
  url.searchParams.set("from", Math.floor(range.from.getTime() / 1000).toString());
  url.searchParams.set("to", Math.floor(range.to.getTime() / 1000).toString());
  url.searchParams.set("page", page.toString());
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Error fetching recent tracks: ${await response.text()}`);
  }
  const data: RecentTracks = await response.json();
  if (parseInt(data.recenttracks["@attr"].page, 10) < parseInt(data.recenttracks["@attr"].totalPages, 10)) {
    const nextPageData = await getRecentTracks(username, range, page + 1);
    return [...data.recenttracks.track, ...nextPageData];
  }
  return data.recenttracks.track;
};

const getTopAlbums = async (username: string, range: { from: Date; to: Date }, top = 5): Promise<ExtendedAlbum[]> => {
  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.searchParams.set("method", "user.getweeklyalbumchart");
  url.searchParams.set("api_key", process.env.NEXT_PUBLIC_LASTFM_API_KEY || "");
  url.searchParams.set("format", "json");
  url.searchParams.set("user", username);
  url.searchParams.set("from", Math.floor(range.from.getTime() / 1000).toString());
  url.searchParams.set("to", Math.floor(range.to.getTime() / 1000).toString());
  url.searchParams.set("limit", top.toString());
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Error fetching top albums: ${await response.text()}`);
  }
  const data: WeeklyAlbum = await response.json();
  return data.weeklyalbumchart.album;
};

const getTopArtists = async (username: string, range: { from: Date; to: Date }, top = 5): Promise<ExtendedArtist[]> => {
  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.searchParams.set("method", "user.getweeklyartistchart");
  url.searchParams.set("api_key", process.env.NEXT_PUBLIC_LASTFM_API_KEY || "");
  url.searchParams.set("format", "json");
  url.searchParams.set("user", username);
  url.searchParams.set("from", Math.floor(range.from.getTime() / 1000).toString());
  url.searchParams.set("to", Math.floor(range.to.getTime() / 1000).toString());
  url.searchParams.set("limit", top.toString());
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Error fetching top artists: ${await response.text()}`);
  }
  const data: WeeklyArtist = await response.json();
  return data.weeklyartistchart.artist;
};

const getTopTracks = async (username: string, range: { from: Date; to: Date }, top = 5): Promise<Track[]> => {
  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.searchParams.set("method", "user.getweeklytrackchart");
  url.searchParams.set("api_key", process.env.NEXT_PUBLIC_LASTFM_API_KEY || "");
  url.searchParams.set("format", "json");
  url.searchParams.set("user", username);
  url.searchParams.set("from", Math.floor(range.from.getTime() / 1000).toString());
  url.searchParams.set("to", Math.floor(range.to.getTime() / 1000).toString());
  url.searchParams.set("limit", top.toString());
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

export { getRecentTracks, getTopAlbums, getTopArtists, getTopTracks, getTrackInfo };
