import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Lokep',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs',
  mode: 'site',
  publicPath: "/aligado/",
  resolve: {
    includes: ['src']
  }
  // more config: https://d.umijs.org/config
});
