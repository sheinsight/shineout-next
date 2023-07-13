interface Config {
  /**
   * @type {string}
   * @default '--'
   * @description css var prefix
   */
  cssvarPrefix?: string;
}

const defaultConfig = {
  cssvarPrefix: '--',
};

export const setConfig = (config: Config) => {
  return {
    ...defaultConfig,
    ...config,
  };
};
