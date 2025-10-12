import { getTopAlbums, getTopArtists, getTopTracks, getTrackInfo } from "@/services/lastFm";
import { TopStats } from "@/types/Stats";

const getStats = async (username: string, range: { from: Date; to: Date }, top = 5): Promise<TopStats> => {
  const [topAlbums, topArtists, topTracks] = await Promise.all([
    getTopAlbums(username, range),
    getTopArtists(username, range),
    getTopTracks(username, range)
  ]);

  const minutesArray = await Promise.all(
    topTracks.weeklytrackchart.track.map(async (track) => {
      const trackInfo = await getTrackInfo(username, track.artist["#text"], track.name);
      if (trackInfo && trackInfo.track && trackInfo.track.duration) {
        return (parseInt(track.playcount, 10) * parseInt(trackInfo.track.duration, 10)) / 60000;
      }
      return 0;
    })
  );

  const albums = topAlbums.weeklyalbumchart.album.slice(0, top).map((album) => album.name);
  const artists = topArtists.weeklyartistchart.artist.slice(0, top).map((artist) => ({ name: artist.name }));
  const tracks = topTracks.weeklytrackchart.track
    .slice(0, top)
    .map((track) => ({ name: track.name, playcount: parseInt(track.playcount, 10) }));
  const minutes = minutesArray.reduce((acc, mins) => acc + (mins || 3), 0);
  const count = topTracks.weeklytrackchart.track.reduce((acc, track) => acc + parseInt(track.playcount, 10), 0);

  return {
    albums,
    artists,
    streams: {
      minutes,
      count,
      artists: topArtists.weeklyartistchart.artist.length,
      tracks: topTracks.weeklytrackchart.track.length
    },
    tracks,
    dateRange: range
  };
};

export { getStats };
