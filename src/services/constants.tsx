import { Token } from '../models/token';

export const TOKEN_URL = (iconId: string) =>
  `https://messari.io/asset-images/${iconId}/64.png?v=2`;

export const TOKENS: Token[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    iconId: '21c795f5-1bfd-40c3-858e-e9d7e820c6d0',
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    iconId: '1e31218a-e44e-4285-820c-8282ee222035',
  },
];

export const TOKEN_SYMBOLS = TOKENS.map((d: Token) => d.symbol);

export const DELTA_COLORS = {
  NEUTRAL: 'rgb(243, 244, 246)',
  NEGATIVE: 'rgb(210, 43, 62)',
  POSITIVE: 'rgb(0, 156, 63)',
};

export const TRANSITION_DURATION = 150;
