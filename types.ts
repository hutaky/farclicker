
export interface User {
  fid: number;
  username: string;
  displayName: string;
  pfpUrl: string;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  score: number;
}
