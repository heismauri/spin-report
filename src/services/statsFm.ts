import { Albums, Artists, Tracks, Streams } from "@/types/statsFmResponses";

const getTopAlbums = async (username: string, range: { from: Date; to: Date }, limit: number): Promise<Albums> => {
  const response = await fetch(
    `https://api.stats.fm/api/v1/users/${username}/top/albums?after=${range.from.getTime()}&before=${range.to.getTime()}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error(`Error fetching top albums: ${response.statusText}`);
  }
  const data: Albums = await response.json();
  return data;
};

const getTopArtists = async (username: string, range: { from: Date; to: Date }, limit: number): Promise<Artists> => {
  const response = await fetch(
    `https://api.stats.fm/api/v1/users/${username}/top/artists?after=${range.from.getTime()}&before=${range.to.getTime()}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error(`Error fetching top artists: ${response.statusText}`);
  }
  const data: Artists = await response.json();
  return data;
};

const getTopTracks = async (username: string, range: { from: Date; to: Date }, limit: number): Promise<Tracks> => {
  const response = await fetch(
    `https://api.stats.fm/api/v1/users/${username}/top/tracks?after=${range.from.getTime()}&before=${range.to.getTime()}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error(`Error fetching top tracks: ${response.statusText}`);
  }
  const data: Tracks = await response.json();
  return data;
};

const getStreams = async (username: string, range: { from: Date; to: Date }): Promise<Streams> => {
  const response = await fetch(
    `https://api.stats.fm/api/v1/users/${username}/streams/stats?after=${range.from.getTime()}&before=${range.to.getTime()}`
  );
  if (!response.ok) {
    throw new Error(`Error fetching streams: ${response.statusText}`);
  }
  const data: Streams = await response.json();
  return data;
};

export { getTopAlbums, getTopArtists, getTopTracks, getStreams };
