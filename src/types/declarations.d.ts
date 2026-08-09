// Declared so type-checking passes before `npx expo install --fix` pulls these in.
declare module 'expo-file-system/legacy' {
  export const cacheDirectory: string | null;
  export function downloadAsync(uri: string, fileUri: string): Promise<{ uri: string; status: number }>;
}
declare module 'expo-media-library' {
  export function requestPermissionsAsync(writeOnly?: boolean): Promise<{ granted: boolean }>;
  export function saveToLibraryAsync(localUri: string): Promise<void>;
}

declare module 'react-native-qrcode-svg' {
  import type { ComponentType } from 'react';
  export interface QRCodeProps {
    value?: string;
    size?: number;
    color?: string;
    backgroundColor?: string;
    logo?: any;
    logoSize?: number;
    logoBackgroundColor?: string;
    quietZone?: number;
    ecl?: 'L' | 'M' | 'Q' | 'H';
    getRef?: (ref: any) => void;
  }
  const QRCode: ComponentType<QRCodeProps>;
  export default QRCode;
}
