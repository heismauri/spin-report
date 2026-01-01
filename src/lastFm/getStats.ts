import { getTopAlbums, getTopArtists, getTopTracks, getTrackInfo } from "@/services/lastFm";
import { TopStats } from "@/types/Stats";

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

const getStats = async (username: string, range: { from: Date; to: Date }, top = 5): Promise<TopStats> => {
  const [topAlbums, topArtists, topTracks] = await Promise.all([
    getTopAlbums(username, range),
    getTopArtists(username, range),
    getTopTracks(username, range)
  ]);

  /*
  const minutesArray = await Promise.all(
    topTracks.weeklytrackchart.track.map(async (track) => {
      const trackMinutes = await getTrackMinutes(username, track.artist["#text"], track.name);
      return (trackMinutes || 3) * parseInt(track.playcount, 10);
    })
  );
  */

  const albums = topAlbums.weeklyalbumchart.album
    .slice(0, top)
    .map((album) => ({ name: album.name, playcount: parseInt(album.playcount, 10) }));
  const artists = topArtists.weeklyartistchart.artist
    .slice(0, top)
    .map((artist) => ({ name: artist.name, playcount: parseInt(artist.playcount, 10) }));
  const tracks = topTracks.weeklytrackchart.track
    .slice(0, top)
    .map((track) => ({ name: track.name, playcount: parseInt(track.playcount, 10) }));
  // const minutes = minutesArray.reduce((acc, mins) => acc + mins, 0);
  const count = topTracks.weeklytrackchart.track.reduce((acc, track) => acc + parseInt(track.playcount, 10), 0);

  return {
    albums,
    artists,
    streams: {
      // minutes,
      count,
      artists: topArtists.weeklyartistchart.artist.length,
      tracks: topTracks.weeklytrackchart.track.length
    },
    tracks,
    dateRange: range
  };
};

export { getStats };
