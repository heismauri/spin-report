export interface WeeklyTrack {
  weeklytrackchart: Weeklytrackchart;
}

export interface Weeklytrackchart {
  track: Track[];
}

export interface Track {
  "artist": Artist;
  "image": Image[];
  "mbid": string;
  "url": string;
  "name": string;
  "@attr": TrackAttr;
  "playcount": string;
}

export interface TrackAttr {
  rank: string;
}

export interface Artist {
  "mbid": string;
  "#text": string;
}

export interface Image {
  "size": Size;
  "#text": string;
}

export enum Size {
  Large = "large",
  Medium = "medium",
  Small = "small"
}

export interface TrackInfo {
  track: Track;
}

export interface Track {
  name: string;
  url: string;
  duration: string;
  streamable: Streamable;
  listeners: string;
  playcount: string;
  artist: Artist;
  album: Album;
  userplaycount: string;
  userloved: string;
  toptags: Toptags;
}

export interface Album {
  artist: string;
  title: string;
  url: string;
  image: Image[];
}

export interface Artist {
  name: string;
  mbid: string;
  url: string;
}

export interface Streamable {
  "#text": string;
  "fulltrack": string;
}

export interface Toptags {
  tag: Tag[];
}

export interface Tag {
  name: string;
  url: string;
}

export interface WeeklyArtist {
  weeklyartistchart: Weeklyartistchart;
}

export interface Weeklyartistchart {
  "artist": Artist[];
  "@attr": WeeklyartistchartAttr;
}

export interface WeeklyartistchartAttr {
  from: string;
  user: string;
  to: string;
}

export interface Artist {
  "mbid": string;
  "url": string;
  "name": string;
  "@attr": ArtistAttr;
  "playcount": string;
}

export interface ArtistAttr {
  rank: string;
}

export interface WeeklyAlbum {
  weeklyalbumchart: Weeklyalbumchart;
}

export interface Weeklyalbumchart {
  "album": AlbumTwo[];
  "@attr": WeeklyalbumchartAttr;
}

export interface WeeklyalbumchartAttr {
  from: string;
  user: string;
  to: string;
}

export interface AlbumTwo {
  "artist": Artist;
  "mbid": string;
  "url": string;
  "name": string;
  "@attr": AlbumAttr;
  "playcount": string;
}

export interface AlbumAttr {
  rank: string;
}

export interface Artist {
  "mbid": string;
  "#text": string;
}
