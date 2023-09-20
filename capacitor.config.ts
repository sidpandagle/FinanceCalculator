import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'finance-calculator',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
