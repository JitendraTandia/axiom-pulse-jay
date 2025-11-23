import { Token, Category } from './types';

// Helper to generate random integer
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper to generate random float
const randomFloat = (min: number, max: number) => Math.random() * (max - min) + min;

// Helper to pick random item
const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateMockTokens = (count: number): Token[] => {
  const tokens: Token[] = [];
  const categories = [Category.NEW_PAIRS, Category.FINAL_STRETCH, Category.MIGRATED];
  
  const symbols = ['PEPE', 'DOGE', 'WIF', 'BONK', 'MOG', 'TRUMP', 'BIDEN', 'CAT', 'WOLF', 'ELON', 'MOON', 'ROCKET', 'GEM', 'DIAMOND', 'HANDS', 'APES', 'CHAD', 'GIGACHAD', 'WOJAK', 'PEPE2'];
  const names = ['Pepe Coin', 'Doge Killer', 'Dogwifhat', 'Bonk Token', 'Mog Coin', 'Maga Coin', 'Jeo Boden', 'Pop Cat', 'Wolf of Sol', 'Elon Musk', 'Moon Shot', 'Rocket Lab', 'Gem Stone', 'Diamond Hands', 'Strong Hands', 'Apes Together', 'Giga Chad', 'Chad Coin', 'Wojak Token', 'Pepe 2.0'];

  for (let i = 0; i < count; i++) {
    const symbol = randomItem(symbols);
    const name = randomItem(names);
    const category = categories[i % 3]; // Distribute evenly
    
    // Create variety in metrics
    const marketCap = randomInt(500, 500000);
    const volume = randomInt(100, marketCap * 2); // Volume can be higher than MC sometimes
    const txCount = randomInt(5, 5000);
    const timeAgo = i * 10000 + randomInt(1000, 50000); // Staggered creation times

    // Use DiceBear Shapes for consistent, fast, cacheable SVGs
    const seed = `${symbol}-${i}`;
    const imageUrl = `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}&backgroundColor=1a1d24&shape1Color=3b82f6&shape2Color=10b981&shape3Color=f87171`;

    tokens.push({
      id: `token-${i}`,
      symbol: i % 2 === 0 ? symbol : `${symbol}${randomInt(1, 99)}`, // Variation
      name: i % 2 === 0 ? name : `${name} Protocol`,
      address: `${Math.random().toString(36).substring(2, 6)}...pump`,
      imageUrl: imageUrl,
      createdAt: Date.now() - timeAgo,
      marketCap,
      volume,
      liquidity: randomFloat(1, 50),
      txCount,
      txRate: randomInt(1, 200),
      priceChange5m: randomInt(-50, 100),
      priceChange1h: randomInt(-20, 50),
      badges: Math.random() > 0.7 ? ['DS'] : [],
      socials: {
        twitter: Math.random() > 0.3,
        telegram: Math.random() > 0.3,
        website: Math.random() > 0.5
      },
      holders: randomInt(10, 5000),
      category,
      lastUpdate: Date.now(),
      fdv: marketCap,
      security: {
        noMint: Math.random() > 0.2,
        hasAudit: Math.random() > 0.5,
        top10: randomInt(0, 50),
        blueChip: randomInt(0, 10),
        sniperScore: randomInt(0, 100)
      }
    });
  }
  return tokens;
};

// REDUCED FROM 48 TO 30 to improve Lighthouse DOM Size score (< 1500 nodes recommended)
export const MOCK_TOKENS: Token[] = generateMockTokens(30);