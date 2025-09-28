export interface Albums {
  items: AlbumsItem[];
}

export interface AlbumsItem {
  position: number;
  streams: number;
  playedMs: number;
  indicator: null;
  album: Album;
}

export interface Album {
  name: string;
  image: string;
  label: string;
  totalTracks: number;
  releaseDate: number;
  genres: string[];
  artists: Artist[];
  id: number;
}

export interface Artists {
  items: ArtistsItem[];
}

export interface ArtistsItem {
  position: number;
  streams: number;
  playedMs: number;
  indicator: null;
  artist: Artist;
}

export interface Artist {
  followers: number;
  genres: string[];
  id: number;
  image?: string;
  name: string;
}

export interface Tracks {
  items: TracksItem[];
}

export interface TracksItem {
  position: number;
  streams: number;
  playedMs: number;
  indicator: null;
  track: Track;
}

export interface Track {
  albums: Data[];
  artists: Data[];
  durationMs: number;
  explicit: boolean;
  id: number;
  name: string;
}

export interface Data {
  id: number;
  image?: string;
  name: string;
}

export interface Streams {
  items: StreamsItem;
}

export interface StreamsItem {
  durationMs: number;
  count: number;
  playedMs: PlayedMS;
  cardinality: Cardinality;
}

export interface Cardinality {
  tracks: number;
  artists: number;
  albums: number;
}

export interface PlayedMS {
  count: number;
  min: number;
  max: number;
  avg: number;
  sum: number;
}
