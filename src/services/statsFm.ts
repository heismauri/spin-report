import { env } from "cloudflare:workers";

import { Albums, Artists, Tracks, Streams } from "@/types/statsFmResponses";

const getTopAlbums = async (username: string, range: { from: Date; to: Date }): Promise<Albums> => {
  const response = await fetch(
    `${env.BASE_URL}/${username}/top/albums?after=${range.from.getTime()}&before=${range.to.getTime()}`
  );
  const data: Albums = await response.json();
  return data;
};

const getTopArtists = async (username: string, range: { from: Date; to: Date }): Promise<Artists> => {
  const response = await fetch(
    `${env.BASE_URL}/${username}/top/artists?after=${range.from.getTime()}&before=${range.to.getTime()}`
  );
  const data: Artists = await response.json();
  return data;
};

const getTopTracks = async (username: string, range: { from: Date; to: Date }): Promise<Tracks> => {
  const response = await fetch(
    `${env.BASE_URL}/${username}/top/tracks?after=${range.from.getTime()}&before=${range.to.getTime()}`
  );
  const data: Tracks = await response.json();
  return data;
}

const getStreams = async (username: string, range: { from: Date; to: Date }): Promise<Streams> => {
  const response = await fetch(
    `${env.BASE_URL}/${username}/streams/stats?after=${range.from.getTime()}&before=${range.to.getTime()}`
  );
  const data: Streams = await response.json();
  return data;
}

const getStats = async (username: string, range: { from: Date; to: Date }): Promise<any> => {
  const [albums, artists, tracks, streams] = await Promise.all([
    getTopAlbums(username, range),
    getTopArtists(username, range),
    getTopTracks(username, range),
    getStreams(username, range),
  ]);
  return { albums, artists, tracks, streams };
};

export { getTopAlbums, getTopArtists, getTopTracks, getStreams, getStats };
