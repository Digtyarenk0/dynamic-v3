export interface Watermaked {
  extractedId?: string;
  embedId?: string;
}

export interface WatermakedEmbed {
  extractedId?: string;
  embedId: string;
  hash: string;
}

export interface WatermakedExtract {
  extractedId: string;
  embedId?: string;
}
