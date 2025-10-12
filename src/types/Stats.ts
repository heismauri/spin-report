export interface TopStats {
  albums: string[];
  artists: { name: string; image?: string }[];
  tracks: { name: string; playcount: number }[];
  streams: { minutes: number; count: number; tracks: number; artists: number };
  dateRange: { from: Date; to: Date };
}
