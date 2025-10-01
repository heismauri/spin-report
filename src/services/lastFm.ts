import { TrackInfo, WeeklyAlbum, WeeklyArtist, WeeklyTrack } from "@/types/lastFmResponses";

const getTopAlbums = async (username: string, range: { from: Date; to: Date }): Promise<WeeklyAlbum> => {
  const response = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=user.getweeklyalbumchart&user=${username}&api_key=ec4443a9f043ef9227f7421c83324c67&format=json&from=${Math.floor(range.from.getTime() / 1000)}&to=${Math.floor(range.to.getTime() / 1000)}`
  );
  if (!response.ok) {
    throw new Error(`Error fetching top albums: ${response.statusText}`);
  }
  const data: WeeklyAlbum = await response.json();
  return data;
}

const getTopArtists = async (username: string, range: { from: Date; to: Date }): Promise<WeeklyArtist> => {
  const response = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user=${username}&api_key=ec4443a9f043ef9227f7421c83324c67&format=json&from=${Math.floor(range.from.getTime() / 1000)}&to=${Math.floor(range.to.getTime() / 1000)}`
  );
  if (!response.ok) {
    throw new Error(`Error fetching top artists: ${response.statusText}`);
  }
  const data: WeeklyArtist = await response.json();
  return data;
};

const getTopTracks = async (username: string, range: { from: Date; to: Date }): Promise<WeeklyTrack> => {
  const response = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=user.getweeklytrackchart&user=${username}&api_key=ec4443a9f043ef9227f7421c83324c67&format=json&from=${Math.floor(range.from.getTime() / 1000)}&to=${Math.floor(range.to.getTime() / 1000)}`
  );
  if (!response.ok) {
    throw new Error(`Error fetching top tracks: ${response.statusText}`);
  }
  const data: WeeklyTrack = await response.json();
  return data;
}

const getTrackInfo = async (username: string, artist: string, track: string): Promise<TrackInfo> => {
  const response = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=track.getinfo&user=${username}&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}&api_key=ec4443a9f043ef9227f7421c83324c67&format=json`
  );
  if (!response.ok) {
    throw new Error(`Error fetching track info: ${response.statusText}`);
  }
  const data: TrackInfo = await response.json();
  return data;
};

export { getTopAlbums, getTopArtists, getTopTracks, getTrackInfo };
