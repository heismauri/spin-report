export interface WeeklyAlbum {
  weeklyalbumchart: {
    "album": ExtendedAlbum[];
    "@attr": Pagination;
  };
}

export interface WeeklyArtist {
  weeklyartistchart: {
    "artist": ExtendedArtist[];
    "@attr": Pagination;
  };
}

export interface WeeklyTrack {
  weeklytrackchart: {
    "track": Track[];
    "@attr": Pagination;
  };
}

export interface TrackInfo {
  track: ExtendedTrack;
}

export interface Album {
  artist: string;
  title: string;
  url: string;
}

export interface ExtendedAlbum extends Album {
  mbid: string;
  name: string;
  playcount: string;
}

export interface Artist {
  "mbid": string;
  "#text": string;
}

export interface ExtendedArtist extends Artist {
  name: string;
  mbid: string;
  url: string;
  playcount: string;
}

export interface Track {
  artist: Artist;
  mbid: string;
  url: string;
  name: string;
  playcount: string;
}

export interface ExtendedTrack extends Track {
  duration: string;
  listeners: string;
  album: Album;
  userplaycount: string;
  userloved: string;
}

export interface Pagination {
  user: string;
  totalPages: string;
  page: string;
  perPage: string;
  total: string;
}
