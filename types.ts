export enum Category {
  NEW_PAIRS = 'NEW_PAIRS',
  FINAL_STRETCH = 'FINAL_STRETCH',
  MIGRATED = 'MIGRATED',
}

export interface Token {
  id: string;
  symbol: string;
  name: string;
  address: string;
  imageUrl: string;
  createdAt: number; // timestamp
  marketCap: number;
  volume: number;
  liquidity: number;
  txCount: number;
  txRate: number; // tx per min
  priceChange5m: number;
  priceChange1h: number;
  badges: string[]; // e.g. 'DS', 'Audit'
  socials: {
    twitter?: boolean;
    telegram?: boolean;
    website?: boolean;
  };
  holders: number;
  category: Category;
  lastUpdate: number;
  // New fields for pixel perfection
  fdv: number;
  security: {
    noMint: boolean;
    hasAudit: boolean;
    top10: number; // percentage
    blueChip: number; // percentage
    sniperScore: number;
  };
}

export interface TokenUpdate {
  id: string;
  marketCap: number;
  volume: number;
  txCount: number;
  security?: {
    top10?: number;
    sniperScore?: number;
    blueChip?: number;
  };
}