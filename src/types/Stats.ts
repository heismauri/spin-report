export interface TopStats {
  albums: string[];
  artists: { name: string; image?: string }[];
  tracks: string[];
  minutes: number;
  streams: number;
  dateRange: { from: Date; to: Date };
}
