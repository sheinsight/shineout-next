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
