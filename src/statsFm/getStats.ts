import { getTopAlbums, getTopArtists, getTopTracks, getStreams } from "@/services/statsFm";
import { TopStats } from "@/types/Stats";

const getStats = async (username: string, range: { from: Date; to: Date }, top = 5): Promise<TopStats> => {
  const [topAlbums, topArtists, topTracks, streamsData] = await Promise.all([
    // *3 is to account for current bug in Stats.fm API
    getTopAlbums(username, range, top * 3),
    getTopArtists(username, range, top * 3),
    getTopTracks(username, range, top * 3),
    getStreams(username, range)
  ]);

  const albums = topAlbums.items.slice(0, top).map((album) => ({ name: album.album.name, playcount: album.streams }));
  const artists = topArtists.items
    .slice(0, top)
    .map((artist) => ({ name: artist.artist.name, image: artist.artist.image, playcount: artist.streams }));
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
    dateRange: range,
    images: artists.flatMap((a) => (a.image !== undefined ? [a.image] : []))
  };
};

export { getStats };
