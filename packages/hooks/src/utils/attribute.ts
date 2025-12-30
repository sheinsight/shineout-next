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

type ExtractType = 'mouse' | 'data-attr';

/**
 * Extract specific types of props from the props object
 * @param props - The props object to extract from
 * @param type - The type of props to extract ('mouse' for mouse events, 'data-attr' for data-* attributes)
 * @returns An object containing only the extracted props
 */
export const extractProps = (props: Record<string, any>, type: ExtractType) => {
  const result: Record<string, any> = {};

  if (type === 'mouse') {
    // Only extract onMouseEnter and onMouseLeave for Tooltip support
    if (props.onMouseEnter && typeof props.onMouseEnter === 'function') {
      result.onMouseEnter = props.onMouseEnter;
    }
    if (props.onMouseLeave && typeof props.onMouseLeave === 'function') {
      result.onMouseLeave = props.onMouseLeave;
    }
  } else if (type === 'data-attr') {
    // Extract all data-* attributes
    Object.keys(props).forEach((key) => {
      if (key.startsWith('data-')) {
        result[key] = props[key];
      }
    });
  }

  return result;
};
