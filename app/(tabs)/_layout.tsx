import { Tabs } from 'expo-router';
import { Compass, GearSix, Images, QrCode, Storefront } from 'phosphor-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useLocale } from '@/i18n';
import { t } from '@/data/ui';
import { COLORS } from '@/theme/theme';

// Big, round, elevated scan button that stands out in the center of the bar.
function ScanButton({ focused }: { focused: boolean }) {
  return (
    <View style={styles.scanWrap} pointerEvents="none">
      <View style={[styles.scanBtn, focused && styles.scanBtnActive]}>
        <QrCode size={30} color="#0B0B0F" weight="bold" />
      </View>
    </View>
  );
}

export default function TabsLayout() {
  const { locale } = useLocale();
  return (
    <Tabs
      initialRouteName="collection"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.gold,
        tabBarInactiveTintColor: COLORS.textFaint,
        tabBarStyle: {
          backgroundColor: COLORS.bgElevated,
          borderTopColor: COLORS.hairline,
          borderTopWidth: 1,
          height: 90,
          paddingTop: 12,
          paddingBottom: 30,
        },
        tabBarItemStyle: { paddingTop: 2 },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      {/* Order: Collection · Discover · Scan · Trade · Settings */}
      <Tabs.Screen
        name="collection"
        options={{
          title: t(locale, 'tab.collection'),
          tabBarIcon: ({ color, focused }) => (
            <Images size={26} color={color} weight={focused ? 'fill' : 'regular'} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: t(locale, 'tab.discover'),
          tabBarIcon: ({ color, focused }) => (
            <Compass size={26} color={color} weight={focused ? 'fill' : 'regular'} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => <ScanButton focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="trade"
        options={{
          title: t(locale, 'tab.giftShop'),
          tabBarIcon: ({ color, focused }) => (
            <Storefront size={26} color={color} weight={focused ? 'fill' : 'regular'} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t(locale, 'tab.settings'),
          tabBarIcon: ({ color, focused }) => (
            <GearSix size={26} color={color} weight={focused ? 'fill' : 'regular'} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  scanWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 68,
  },
  scanBtn: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -26, // lift it above the bar so it pops
    borderWidth: 4,
    borderColor: COLORS.bg,
    shadowColor: COLORS.gold,
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  scanBtnActive: {
    shadowOpacity: 0.85,
    shadowRadius: 16,
  },
});
