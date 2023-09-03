import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.flightTime',
  appName: 'Flight Time',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
};

export default config;
