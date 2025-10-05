import { TrackInfo, WeeklyAlbum, WeeklyArtist, WeeklyTrack } from "@/types/lastFmResponses";

const getTopAlbums = async (username: string, range: { from: Date; to: Date }): Promise<WeeklyAlbum> => {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getweeklyalbumchart&user=${username}&api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}&format=json&from=${Math.floor(range.from.getTime() / 1000)}&to=${Math.floor(range.to.getTime() / 1000)}`
  );
  if (!response.ok) {
    throw new Error(`Error fetching top albums: ${await response.text()}`);
  }
  const data: WeeklyAlbum = await response.json();
  return data;
}

const getTopArtists = async (username: string, range: { from: Date; to: Date }): Promise<WeeklyArtist> => {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user=${username}&api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}&format=json&from=${Math.floor(range.from.getTime() / 1000)}&to=${Math.floor(range.to.getTime() / 1000)}`
  );
  if (!response.ok) {
    throw new Error(`Error fetching top artists: ${await response.text()}`);
  }
  const data: WeeklyArtist = await response.json();
  return data;
};

const getTopTracks = async (username: string, range: { from: Date; to: Date }): Promise<WeeklyTrack> => {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getweeklytrackchart&user=${username}&api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}&format=json&from=${Math.floor(range.from.getTime() / 1000)}&to=${Math.floor(range.to.getTime() / 1000)}`
  );
  if (!response.ok) {
    throw new Error(`Error fetching top tracks: ${await response.text()}`);
  }
  const data: WeeklyTrack = await response.json();
  return data;
}

const getTrackInfo = async (username: string, artist: string, track: string): Promise<TrackInfo> => {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=track.getinfo&user=${username}&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}&api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}&format=json`
  );
  if (!response.ok) {
    throw new Error(`Error fetching track info: ${await response.text()}`);
  }
  const data: TrackInfo = await response.json();
  return data;
};

export { getTopAlbums, getTopArtists, getTopTracks, getTrackInfo };
