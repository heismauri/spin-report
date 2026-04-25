import {
  ExtendedAlbum,
  ExtendedArtist,
  Track,
  TrackInfo,
  WeeklyAlbum,
  WeeklyArtist,
  WeeklyTrack
} from "@/types/lastFmResponses";

const getTopAlbums = async (username: string, range: { from: Date; to: Date }, page = 1): Promise<ExtendedAlbum[]> => {
  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.searchParams.set("method", "user.getweeklyalbumchart");
  url.searchParams.set("user", username);
  url.searchParams.set("api_key", process.env.NEXT_PUBLIC_LASTFM_API_KEY || "");
  url.searchParams.set("format", "json");
  url.searchParams.set("from", Math.floor(range.from.getTime() / 1000).toString());
  url.searchParams.set("to", Math.floor(range.to.getTime() / 1000).toString());
  url.searchParams.set("limit", "5");
  url.searchParams.set("page", page.toString());
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Error fetching top albums: ${await response.text()}`);
  }
  const data: WeeklyAlbum = await response.json();
  if (parseInt(data.weeklyalbumchart["@attr"].page, 10) < parseInt(data.weeklyalbumchart["@attr"].totalPages, 10)) {
    const nextPageData = await getTopAlbums(username, range, page + 1);
    return [...data.weeklyalbumchart.album, ...nextPageData];
  }
  return data.weeklyalbumchart.album;
};

const getTopArtists = async (
  username: string,
  range: { from: Date; to: Date },
  page = 1
): Promise<ExtendedArtist[]> => {
  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.searchParams.set("method", "user.getweeklyartistchart");
  url.searchParams.set("user", username);
  url.searchParams.set("api_key", process.env.NEXT_PUBLIC_LASTFM_API_KEY || "");
  url.searchParams.set("format", "json");
  url.searchParams.set("from", Math.floor(range.from.getTime() / 1000).toString());
  url.searchParams.set("to", Math.floor(range.to.getTime() / 1000).toString());
  url.searchParams.set("limit", "1000");
  url.searchParams.set("page", page.toString());
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Error fetching top artists: ${await response.text()}`);
  }
  const data: WeeklyArtist = await response.json();
  if (parseInt(data.weeklyartistchart["@attr"].page, 10) < parseInt(data.weeklyartistchart["@attr"].totalPages, 10)) {
    const nextPageData = await getTopArtists(username, range, page + 1);
    return [...data.weeklyartistchart.artist, ...nextPageData];
  }
  return data.weeklyartistchart.artist;
};

const getTopTracks = async (username: string, range: { from: Date; to: Date }, page = 1): Promise<Track[]> => {
  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.searchParams.set("method", "user.getweeklytrackchart");
  url.searchParams.set("user", username);
  url.searchParams.set("api_key", process.env.NEXT_PUBLIC_LASTFM_API_KEY || "");
  url.searchParams.set("format", "json");
  url.searchParams.set("from", Math.floor(range.from.getTime() / 1000).toString());
  url.searchParams.set("to", Math.floor(range.to.getTime() / 1000).toString());
  url.searchParams.set("limit", "1000");
  url.searchParams.set("page", page.toString());
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Error fetching top tracks: ${await response.text()}`);
  }
  const data: WeeklyTrack = await response.json();
  if (parseInt(data.weeklytrackchart["@attr"].page, 10) < parseInt(data.weeklytrackchart["@attr"].totalPages, 10)) {
    const nextPageData = await getTopTracks(username, range, page + 1);
    return [...data.weeklytrackchart.track, ...nextPageData];
  }
  return data.weeklytrackchart.track;
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

export { getTopAlbums, getTopArtists, getTopTracks, getTrackInfo };
