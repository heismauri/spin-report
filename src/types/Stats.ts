export interface TopStats {
  albums: string[];
  artists: { name: string; image?: string }[];
  tracks: { name: string; playcount: number }[];
  minutes: number;
  streams: number;
  dateRange: { from: Date; to: Date };
}
