// App locale: the language the player picks in Settings. Persisted, and exposed
// via a context so screens re-render when it changes. UI-string translation and
// localized painting data (see src/data/localized.ts) both key off this.

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Locale = 'en' | 'es' | 'fr' | 'it' | 'pt' | 'de';

// Only the languages we have hand-written content for are offered. More can be
// re-enabled here once their translations are filled in.
export const LANGUAGES: { code: Locale; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'it', label: 'Italiano' },
  { code: 'pt', label: 'Português' },
  { code: 'de', label: 'Deutsch' },
];

const KEY = 'qart.locale.v1';

const Ctx = createContext<{ locale: Locale; setLocale: (l: Locale) => void }>({
  locale: 'en',
  setLocale: () => {},
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    AsyncStorage.getItem(KEY).then((v) => {
      if (v && LANGUAGES.some((l) => l.code === v)) setLocaleState(v as Locale);
    });
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    AsyncStorage.setItem(KEY, l).catch(() => {});
  };

  return <Ctx.Provider value={{ locale, setLocale }}>{children}</Ctx.Provider>;
}

export const useLocale = () => useContext(Ctx);
