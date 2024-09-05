export type BuildMode = 'production' | 'development';

export interface BuildPaths {
  entry: string;
  build: string;
  html: string;
  ico: string;
  src: string;
  locales: string;
  buildLocales: string;
  //
  magicSDK: string;
  dynamicEthersV6: string;
}

export interface BuildEnv {
  mode: BuildMode;
  port: number;
  apiUrl: string;
}

export interface BuildOptions {
  mode: BuildMode;
  paths: BuildPaths;
  isDev: boolean;
  isAnalyze: boolean;
  port: number;
}