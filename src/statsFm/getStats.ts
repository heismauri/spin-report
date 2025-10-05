import { getTopAlbums, getTopArtists, getTopTracks, getStreams } from "@/services/statsFm";
import { TopStats } from "@/types/Stats";

const getStats = async (username: string, range: { from: Date; to: Date }, top = 5): Promise<TopStats> => {
  const [topAlbums, topArtists, topTracks, streamsData] = await Promise.all([
    getTopAlbums(username, range),
    getTopArtists(username, range),
    getTopTracks(username, range),
    getStreams(username, range),
  ]);

  const albums = topAlbums.items.slice(0, top).map(({ album }) => album.name);
  const artists = topArtists.items.slice(0, top).map(({ artist }) => ({ name: artist.name, image: artist.image }));
  const tracks = topTracks.items.slice(0, top).map(({ track }) => track.name);
  const minutes = streamsData.items.playedMs.sum / 60000;
  const streams = streamsData.items.playedMs.count;

  return { albums, artists, streams, minutes, tracks, dateRange: range };
};

export { getStats };
