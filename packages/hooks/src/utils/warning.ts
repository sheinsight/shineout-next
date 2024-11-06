const deprecated = (
  prop: string,
  newProp: string,
  component: string,
  extraMessage?: string
) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      `[shineout] '${prop}' in ${component} component is deprecated, please use '${newProp}' instead. ${extraMessage}`
    );
  }
};

const breakingChange = (message: string) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[shineout] ${message}`);
  }
};

const devWarn = (message: string) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[shineout] ${message}`);
  }
};

export const devUseWarning = {
  deprecated,
  warning: devWarn,
  breaking: breakingChange,
};
