import { useState } from "react";

import { Session } from "next-auth";
import { AppProps } from 'next/app';
import { NextComponentType } from "next";

import { RecoilRoot } from 'recoil'

import { CacheProvider, EmotionCache } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { responsiveFontSizes, useMediaQuery } from "@mui/material";

import { defaultTheme } from "ui/theme";
import Layout from 'ui/components/Layout';
import ColorModeContext from "states/colorModeContext";
import createEmotionCache from '../ui/createEmotionCache';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps<{ session: Session }> {
  emotionCache?: EmotionCache;
  Component: NextComponentType & { requireAuth?: boolean };
}

export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
}: MyAppProps) {
  // >>> setting theme
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)');
  const [mode, setMode] = useState<'dark' | 'light'>(prefersDarkMode ? 'dark' : 'light');

  const colorMode = {
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  };

  const theme = responsiveFontSizes(
    createTheme({
      palette: {
        mode: mode,
        ...defaultTheme.palette,
      },
      typography: {
        ...defaultTheme.typography,
      }
    })
  );
  // <<< setting theme

  return (
    <CacheProvider value={emotionCache}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <Layout >
              <Component {...pageProps} />
            </Layout>
          </RecoilRoot>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </CacheProvider>
  );
}
