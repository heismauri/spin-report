import { getRecentTracks, getTopAlbums, getTopArtists, getTopTracks } from "@/services/lastFm";
import { ExtendedArtist, Track } from "@/types/lastFmResponses";
import { TopStats } from "@/types/Stats";

/*
const getTrackMinutes = async (
  username: string,
  artist: string,
  trackName: string,
  firstTry = true
): Promise<number> => {
  try {
    const trackInfo = await getTrackInfo(username, artist, trackName);
    if (trackInfo && trackInfo.track && trackInfo.track.duration) {
      return parseInt(trackInfo.track.duration, 10) / 60000;
    }
    return 0;
  } catch (error) {
    if (firstTry) {
      return getTrackMinutes(username, artist, trackName, false);
    }
    return 0;
  }
};
*/

const getPlaycounts = async (
  username: string,
  range: { from: Date; to: Date },
  artists: ExtendedArtist[],
  tracks: Track[]
): Promise<{ artistsCount: number; tracksCount: number; spinCount: number }> => {
  if (artists.length === 1000 || tracks.length === 1000) {
    const recentTracks = await getRecentTracks(username, range);
    const artistsCount = new Set(recentTracks.map((track) => track.artist["#text"])).size;
    const tracksCount = new Set(recentTracks.map((track) => `${track.name}-${track.artist["#text"]}`)).size;
    const spinCount = recentTracks.length;
    return { artistsCount, tracksCount, spinCount };
  }
  const artistsCount = artists.length;
  const tracksCount = tracks.length;
  const spinCount = artists.reduce((acc, artist) => acc + parseInt(artist.playcount, 10), 0);
  return { artistsCount, tracksCount, spinCount };
};

const getStats = async (username: string, range: { from: Date; to: Date }, top = 5): Promise<TopStats> => {
  const [topAlbums, topArtists, topTracks] = await Promise.all([
    getTopAlbums(username, range),
    getTopArtists(username, range, 1000),
    getTopTracks(username, range, 1000)
  ]);

  /*
  const minutesArray = await Promise.all(
    topTracks.weeklytrackchart.track.map(async (track) => {
      const trackMinutes = await getTrackMinutes(username, track.artist["#text"], track.name);
      return (trackMinutes || 3) * parseInt(track.playcount, 10);
    })
  );
  */

  const albums = topAlbums
    .slice(0, top)
    .map((album) => ({ name: album.name, playcount: parseInt(album.playcount, 10) }));
  const artists = topArtists
    .slice(0, top)
    .map((artist) => ({ name: artist.name, playcount: parseInt(artist.playcount, 10) }));
  const tracks = topTracks
    .slice(0, top)
    .map((track) => ({ name: track.name, playcount: parseInt(track.playcount, 10) }));
  // const minutes = minutesArray.reduce((acc, mins) => acc + mins, 0);
  const { artistsCount, tracksCount, spinCount } = await getPlaycounts(username, range, topArtists, topTracks);

  return {
    albums,
    artists,
    streams: {
      // minutes,
      count: spinCount,
      artists: artistsCount,
      tracks: tracksCount
    },
    tracks,
    dateRange: range
  };
};

export { getStats };
