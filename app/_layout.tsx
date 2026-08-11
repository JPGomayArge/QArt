import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { SafetyScreen } from '@/components/SafetyScreen';
import { I18nProvider } from '@/i18n';
import { warmImageCache, warmRoom } from '@/game/prefetch';
import { GameProvider, useGame } from '@/store/GameStore';
import { COLORS } from '@/theme/theme';

function RootGate() {
  const { ready, safetyAck, acknowledgeSafety, owned, room } = useGame();

  // Cache the catalog on-device once the save is loaded (runs in background).
  useEffect(() => {
    if (!ready) return;
    // My Room first: those ten pieces are the ones a tap away from being needed.
    warmRoom(room).then(() => warmImageCache(Object.keys(owned)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  // Wait for the save to load so we don't flash the wrong screen.
  if (!ready) return <View style={{ flex: 1, backgroundColor: COLORS.bg }} />;

  // First-run safety notice, shown until acknowledged.
  if (!safetyAck) return <SafetyScreen onAcknowledge={acknowledgeSafety} />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.bg },
        animation: 'fade',
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="reveal" options={{ presentation: 'transparentModal', animation: 'fade' }} />
      <Stack.Screen name="artwork/[id]" options={{ presentation: 'card' }} />
      <Stack.Screen name="movement/[key]" options={{ presentation: 'card' }} />
      <Stack.Screen name="artist/[name]" options={{ presentation: 'card' }} />
      <Stack.Screen name="museum/[name]" options={{ presentation: 'card' }} />
      <Stack.Screen name="technique/[key]" options={{ presentation: 'card' }} />
      <Stack.Screen name="country/[name]" options={{ presentation: 'card' }} />
      <Stack.Screen name="collection/[id]" options={{ presentation: 'card' }} />
      <Stack.Screen name="viewer" options={{ presentation: 'fullScreenModal', animation: 'fade' }} />
      <Stack.Screen name="shop" options={{ presentation: 'card' }} />
      <Stack.Screen name="room" options={{ presentation: 'card' }} />
      <Stack.Screen name="dev-catalog" options={{ presentation: 'card' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <SafeAreaProvider>
        <I18nProvider>
          <GameProvider>
            <StatusBar style="light" />
            <RootGate />
          </GameProvider>
        </I18nProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
