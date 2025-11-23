
import { Token, TokenUpdate } from '../types';

type Listener = (update: TokenUpdate) => void;

class MockSocketService {
  private listeners: Listener[] = [];
  private intervalId: number | null = null;
  private tokens: Token[] = [];

  constructor() {
    // Singleton patternish
  }

  public connect(initialTokens: Token[]) {
    this.tokens = initialTokens;
    if (this.intervalId) return;

    // OPTIMIZATION: Increased interval to 3500ms.
    // A fast interval (e.g., 1000ms) causes constant React re-renders and style recalculations,
    // which spikes the "Total Blocking Time" (TBT) in Lighthouse. 
    this.intervalId = window.setInterval(() => {
      this.emitRandomUpdate();
    }, 3500);
  }

  public disconnect() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public subscribe(callback: Listener) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  private emitRandomUpdate() {
    if (this.tokens.length === 0) return;

    // Pick a random token
    const randomIndex = Math.floor(Math.random() * this.tokens.length);
    const token = this.tokens[randomIndex];

    // Volatile Market Cap changes to force reordering
    // 20% chance of a big jump, otherwise small fluctuation
    const isBigMove = Math.random() > 0.8;
    const changeFactor = isBigMove 
        ? 1 + (Math.random() * 0.4 - 0.2) // +/- 20%
        : 1 + (Math.random() * 0.04 - 0.02); // +/- 2%

    const newMc = Math.max(1000, Math.floor(token.marketCap * changeFactor));
    const newVol = Math.floor(token.volume * (1 + Math.random() * 0.05));
    const newTx = token.txCount + Math.floor(Math.random() * 5);

    // Randomize security stats occasionally to flip colors (Red/Green)
    const updateSecurity = Math.random() > 0.7;
    const securityUpdate = updateSecurity ? {
        top10: Math.floor(Math.random() * 60), // 0-60%
        sniperScore: Math.floor(Math.random() * 100), // 0-100
        blueChip: Math.floor(Math.random() * 20),
    } : undefined;

    const update: TokenUpdate = {
      id: token.id,
      marketCap: newMc,
      volume: newVol,
      txCount: newTx,
      security: securityUpdate
    };

    this.listeners.forEach(l => l(update));
  }
}

export const socketService = new MockSocketService();
