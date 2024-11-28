const deprecated = (
  prop: string,
  newProp: string,
  component: string,
  extraMessage?: string
) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(
      `[shineout] '${prop}' in ${component} component is deprecated, please use '${newProp}' instead. ${extraMessage}`
    );
  }
};

const breakingChange = (message: string) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(`[shineout] ${message}`);
  }
};

const devWarn = (message: string) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[shineout] ${message}`);
  }
};

const conflictWarning = (component: string, prop1: string, prop2: string) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[shineout] ${prop1} and ${prop2} cannot be used at the same time in ${component}.`);
  }
};

const error = (message: string) => {
  console.error(new Error(`[shineout] ${message}`));
};

export const devUseWarning = {
  error,
  deprecated,
  warn: devWarn,
  breaking: breakingChange,
  conflict: conflictWarning,
};
