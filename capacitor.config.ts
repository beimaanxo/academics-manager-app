import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.academicsmanager',
  appName: 'Academics Manager',
  webDir: 'dist',
  server: {
    url: 'https://frugal-dogfish-47.convex.app',
    cleartext: false,
    androidScheme: 'https',
    allowNavigation: ['*.convex.app','convex.app','frugal-dogfish-47.convex.app']
  },
  ios: {
    scheme: 'academics'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;