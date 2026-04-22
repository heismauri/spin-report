export interface TopStats {
  albums: { name: string; playcount: number }[];
  artists: { name: string; playcount: number; }[];
  tracks: { name: string; playcount: number }[];
  streams: { minutes?: number; count: number; tracks: number; artists: number };
  dateRange: { from: Date; to: Date };
  images?: string[];
}
