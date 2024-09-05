export interface PlayerPropI {
  className?: string;
  file: string;
  compactView?: boolean;
}

export interface HandleProgress {
  playedSeconds: number;
  loadedSeconds: number;
}
