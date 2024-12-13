const shownMessages = new Set<string>();

const shouldShowMessage = (message: string) => {
  if (shownMessages.has(message)) {
    return false;
  }
  shownMessages.add(message);
  return true;
};

const deprecated = (
  prop: string,
  newProp: string,
  component: string,
  extraMessage?: string
) => {
  if (process.env.NODE_ENV !== 'production') {
    const msg = `[shineout] '${prop}' in ${component} component is deprecated, please use '${newProp}' instead. ${extraMessage}`;
    shouldShowMessage(msg) && console.error(msg);
  }
};

const breakingChange = (message: string) => {
  if (process.env.NODE_ENV !== 'production') {
    const msg = `[shineout] ${message}`;
    shouldShowMessage(msg) && console.error(msg);
  }
};

const devWarn = (message: string) => {
  if (process.env.NODE_ENV !== 'production') {
    shouldShowMessage(message) && console.warn(`[shineout] ${message}`);
  }
};

const conflictWarning = (component: string, prop1: string, prop2: string) => {
  if (process.env.NODE_ENV !== 'production') {
    const msg = `[shineout] ${prop1} and ${prop2} cannot be used at the same time in ${component}.`;
    shouldShowMessage(msg) && console.warn(msg);
  }
};

const error = (message: string) => {
  const msg = new Error(`[shineout] ${message}`);
  shouldShowMessage(msg.message) && console.error(msg);
};

export const devUseWarning = {
  error,
  deprecated,
  warn: devWarn,
  breaking: breakingChange,
  conflict: conflictWarning,
};
