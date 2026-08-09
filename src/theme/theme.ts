// "Museum at night" identity. Dark warm walls, cream light, brass accents.
// UI chrome is English (v1).

import { Platform } from 'react-native';

export const COLORS = {
  bg: '#0C0B0F',
  wall: '#131017', // warm charcoal "gallery wall" for rooms/headers
  bgElevated: '#16141C',
  card: '#1A1720',
  mat: '#0E0D12', // dark mat inside frames
  cardBorder: '#2A2632',
  hairline: '#241F2C',
  text: '#F3EFE6', // warm gallery light
  textDim: '#A9A4B0',
  textFaint: '#6E6A78',
  gold: '#C9A24B',
  goldSoft: '#E4CE97',
  accent: '#C9A24B',
  danger: '#E5687E',
  success: '#5BD6A5',
  overlay: 'rgba(0,0,0,0.6)',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 18,
  xl: 26,
  pill: 999,
};

// A serif display face gives the "museum placard / wall label" feel without
// bundling a custom font. Georgia ships on iOS; Android falls back to serif.
export const FONT = {
  serif: Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' }) as string,
};
