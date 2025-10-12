import { getTopAlbums, getTopArtists, getTopTracks, getStreams } from "@/services/statsFm";
import { TopStats } from "@/types/Stats";

const getStats = async (username: string, range: { from: Date; to: Date }, top = 5): Promise<TopStats> => {
  const [topAlbums, topArtists, topTracks, streamsData] = await Promise.all([
    getTopAlbums(username, range, top),
    getTopArtists(username, range, top),
    getTopTracks(username, range, top),
    getStreams(username, range)
  ]);

  const albums = topAlbums.items.slice(0, top).map(({ album }) => album.name);
  const artists = topArtists.items.slice(0, top).map(({ artist }) => ({ name: artist.name, image: artist.image }));
  const tracks = topTracks.items.slice(0, top).map((track) => ({ name: track.track.name, playcount: track.streams }));
  const minutes = streamsData.items.playedMs.sum / 60000;
  const count = streamsData.items.playedMs.count;

  return {
    albums,
    artists,
    streams: {
      minutes,
      count,
      tracks: streamsData.items.cardinality.tracks,
      artists: streamsData.items.cardinality.artists
    },
    tracks,
    dateRange: range
  };
};

export { getStats };
