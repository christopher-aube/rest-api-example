export type PageConfig = {
  Path: string;
  Page: () => JSX.Element;
};

export type PageConfigs = {
  [key: string]: PageConfig;
};
