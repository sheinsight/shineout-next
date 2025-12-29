export const getDataAttribute = (attrs: Record<string, string | undefined>) => {
  return Object.keys(attrs).reduce((acc, key) => {
    const ns = `data-soui-${key}`;
    if (attrs[key] !== undefined) {
      acc[ns] = attrs[key]!;
    }
    return acc;
  }, {} as Record<string, string>);
};

export const getDataAttributeName = (name: string) => {
  return `data-soui-${name}`;
};

/**
 * Extract native HTML attributes and event handlers from props
 * @param props - The props object to extract from
 * @returns An object containing only valid HTML attributes and event handlers
 */
export const extractNativeProps = (props: Record<string, any>) => {
  const result: Record<string, any> = {};

  // Common HTML attributes that can be passed through
  const allowedAttributes = new Set([
    'id',
    'title',
    'tabIndex',
    'role',
  ]);

  Object.keys(props).forEach((key) => {
    // Allow data-* attributes
    if (key.startsWith('data-')) {
      result[key] = props[key];
    }
    // Allow aria-* attributes
    else if (key.startsWith('aria-')) {
      result[key] = props[key];
    }
    // Allow event handlers (onMouseEnter, onMouseLeave, etc.)
    else if (key.startsWith('on') && typeof props[key] === 'function') {
      result[key] = props[key];
    }
    // Allow specific HTML attributes
    else if (allowedAttributes.has(key)) {
      result[key] = props[key];
    }
  });

  return result;
};
